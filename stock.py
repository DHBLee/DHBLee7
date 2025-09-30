import yfinance as yf
import pandas as pd
import schedule
import time
import talib
import numpy as np
import random

def fetch_minute_data():
    """Fetch 5-minute data for better pattern reliability"""
    try:
        time.sleep(random.uniform(1, 3))
        
        # Primary: Use 5-minute data for better patterns
        data = yf.download("OPEN", period="60d", interval="5m")
        
        if data.empty or len(data) < 100:
            print("Insufficient 5-minute data, trying 15-minute...")
            time.sleep(2)
            data = yf.download("OPEN", period="6mo", interval="15m")
        
        if data is not None and not data.empty:
            # Fix multi-level columns
            if hasattr(data.columns, 'levels'):
                data.columns = [col[0] if isinstance(col, tuple) else col for col in data.columns]
            
            data = data.reset_index()
            
            print(f"Successfully loaded {len(data)} data points (5-minute intervals)")
            print(f"Data range: {data['Datetime'].iloc[0]} to {data['Datetime'].iloc[-1]}")
            
            return data
        
        return None
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        time.sleep(30)
        return None



def validate_data_structure(df):
    """Ensure data has correct structure for TA-Lib"""
    if df is None or df.empty:
        return False
    
    required_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
    
    # Check if all required columns exist
    if not all(col in df.columns for col in required_columns):
        print(f"Missing columns. Required: {required_columns}")
        print(f"Available: {df.columns.tolist()}")
        return False
    
    # Check if we have enough data points
    if len(df) < 50:
        print(f"Insufficient data points: {len(df)}")
        return False
    
    # Check for any NaN values in OHLCV data
    ohlcv_data = df[required_columns]
    if ohlcv_data.isnull().any().any():
        print("Found NaN values in OHLCV data")
        return False
    
    return True

def calculate_technical_indicators(df):
    """Calculate key technical indicators for confirmation"""
    try:
        print(f"DataFrame shape: {df.shape}")
        print(f"DataFrame columns: {df.columns.tolist()}")
        
        # Extract price arrays and ensure they're 1D with correct dtype
        high = df['High'].astype(np.float64).values.flatten()
        low = df['Low'].astype(np.float64).values.flatten()
        close = df['Close'].astype(np.float64).values.flatten()
        volume = df['Volume'].astype(np.float64).values.flatten()  # Convert volume to float64
        
        print(f"Close array shape: {close.shape}, dtype: {close.dtype}")
        print(f"Volume array shape: {volume.shape}, dtype: {volume.dtype}")
        print(f"Sample close values: {close[:5]}")
        print(f"Sample volume values: {volume[:5]}")
        
        # Moving averages for trend context
        df['SMA_20'] = talib.SMA(close, timeperiod=20)
        df['SMA_50'] = talib.SMA(close, timeperiod=50)
        df['EMA_12'] = talib.EMA(close, timeperiod=12)
        df['EMA_26'] = talib.EMA(close, timeperiod=26)
        
        # RSI for momentum
        df['RSI'] = talib.RSI(close, timeperiod=14)
        
        # MACD for trend and momentum
        df['MACD'], df['MACD_signal'], df['MACD_hist'] = talib.MACD(close)
        
        # Bollinger Bands for volatility
        df['BB_upper'], df['BB_middle'], df['BB_lower'] = talib.BBANDS(close, timeperiod=20)
        
        # Volume indicators (these need volume data)
        df['OBV'] = talib.OBV(close, volume)
        df['Volume_SMA'] = talib.SMA(volume, timeperiod=20)
        
        # ATR for volatility and stop loss calculation
        df['ATR'] = talib.ATR(high, low, close, timeperiod=14)
        
        print("All indicators calculated successfully!")
        return df
        
    except Exception as e:
        print(f"Error in indicator calculation: {e}")
        print(f"Data types:")
        print(f"High dtype: {df['High'].dtype}")
        print(f"Low dtype: {df['Low'].dtype}")
        print(f"Close dtype: {df['Close'].dtype}")
        print(f"Volume dtype: {df['Volume'].dtype}")
        raise e


def detect_key_patterns(df):
    """Focus on most reliable candlestick patterns"""
    openp = df['Open'].values
    high = df['High'].values
    low = df['Low'].values
    close = df['Close'].values
    
    # Most reliable bullish patterns
    reliable_bullish = {
        'HAMMER': talib.CDLHAMMER(openp, high, low, close),
        'INVERTED_HAMMER': talib.CDLINVERTEDHAMMER(openp, high, low, close),
        'ENGULFING_BULL': talib.CDLENGULFING(openp, high, low, close),
        'MORNING_STAR': talib.CDLMORNINGSTAR(openp, high, low, close),
        'PIERCING': talib.CDLPIERCING(openp, high, low, close),
        'DOJI': talib.CDLDOJI(openp, high, low, close),
        'THREE_WHITE_SOLDIERS': talib.CDL3WHITESOLDIERS(openp, high, low, close)
    }
    
    # Most reliable bearish patterns
    reliable_bearish = {
        'HANGING_MAN': talib.CDLHANGINGMAN(openp, high, low, close),
        'SHOOTING_STAR': talib.CDLSHOOTINGSTAR(openp, high, low, close),
        'ENGULFING_BEAR': talib.CDLENGULFING(openp, high, low, close),
        'EVENING_STAR': talib.CDLEVENINGSTAR(openp, high, low, close),
        'DARK_CLOUD': talib.CDLDARKCLOUDCOVER(openp, high, low, close),
        'THREE_BLACK_CROWS': talib.CDL3BLACKCROWS(openp, high, low, close)
    }
    
    # Add patterns to dataframe
    for name, values in reliable_bullish.items():
        df[f'BULL_{name}'] = values
    
    for name, values in reliable_bearish.items():
        df[f'BEAR_{name}'] = values
    
    return df

def calculate_trend_strength(df):
    """Determine overall trend direction and strength"""
    latest = df.iloc[-1]
    
    # Price position relative to moving averages
    price_above_sma20 = latest['Close'] > latest['SMA_20']
    price_above_sma50 = latest['Close'] > latest['SMA_50']
    sma20_above_sma50 = latest['SMA_20'] > latest['SMA_50']
    
    # MACD trend
    macd_bullish = latest['MACD'] > latest['MACD_signal']
    
    # Calculate trend score (0 to +4 for bullish, 0 to -4 for bearish)
    trend_score = 0
    if price_above_sma20: trend_score += 1
    else: trend_score -= 1
        
    if price_above_sma50: trend_score += 1
    else: trend_score -= 1
        
    if sma20_above_sma50: trend_score += 1
    else: trend_score -= 1
        
    if macd_bullish: trend_score += 1
    else: trend_score -= 1
    
    return trend_score

def check_volume_confirmation(df):
    """Check if current volume supports the signal"""
    latest = df.iloc[-1]
    
    # Volume should be above average for strong signals
    volume_confirmed = latest['Volume'] > latest['Volume_SMA'] * 1.2
    
    # OBV trend confirmation (5-period slope)
    obv_slope = df['OBV'].iloc[-5:].diff().mean()
    obv_bullish = obv_slope > 0
    
    return volume_confirmed, obv_bullish

def generate_enhanced_signals(df):
    """Generate signals with multiple confirmations"""
    if len(df) < 50:  # Need enough data for indicators
        return 'INSUFFICIENT_DATA', 0, {}
    
    latest = df.iloc[-1]
    
    # Get trend strength
    trend_score = calculate_trend_strength(df)
    
    # Get volume confirmation
    volume_confirmed, obv_bullish = check_volume_confirmation(df)
    
    # Check RSI conditions
    rsi = latest['RSI']
    rsi_oversold = rsi < 30
    rsi_overbought = rsi > 70
    
    # Check candlestick patterns
    bullish_patterns = []
    bearish_patterns = []
    
    for col in df.columns:
        if col.startswith('BULL_') and latest[col] > 0:
            bullish_patterns.append(col)
        elif col.startswith('BEAR_') and latest[col] < 0:
            bearish_patterns.append(col)
    
    # Signal strength calculation
    signal_details = {
        'trend_score': trend_score,
        'rsi': rsi,
        'volume_confirmed': volume_confirmed,
        'obv_bullish': obv_bullish,
        'bullish_patterns': bullish_patterns,
        'bearish_patterns': bearish_patterns,
        'price': latest['Close'],
        'atr': latest['ATR'] if not pd.isna(latest['ATR']) else 0
    }
    
    # STRONG BUY CONDITIONS (All confirmations align)
    if (len(bullish_patterns) >= 1 and 
        trend_score >= 2 and 
        rsi_oversold and 
        volume_confirmed and
        obv_bullish):
        return 'STRONG_BUY', 3, signal_details
    
    # BUY CONDITIONS (Most confirmations align)
    elif (len(bullish_patterns) >= 1 and 
          trend_score >= 0 and 
          rsi < 50 and
          (volume_confirmed or obv_bullish)):
        return 'BUY', 2, signal_details
    
    # STRONG SELL CONDITIONS (All confirmations align)
    elif (len(bearish_patterns) >= 1 and 
          trend_score <= -2 and 
          rsi_overbought and 
          volume_confirmed and
          not obv_bullish):
        return 'STRONG_SELL', 3, signal_details
    
    # SELL CONDITIONS (Most confirmations align)
    elif (len(bearish_patterns) >= 1 and 
          trend_score <= 0 and 
          rsi > 50 and
          (volume_confirmed or not obv_bullish)):
        return 'SELL', 2, signal_details
    
    return 'HOLD', 0, signal_details

def calculate_position_sizing(df, risk_percent=1.0, account_balance=10000):
    """Calculate position size based on ATR and risk management"""
    latest = df.iloc[-1]
    
    # Calculate stop loss distance (2x ATR for safer stops)
    atr_value = latest['ATR'] if not pd.isna(latest['ATR']) else latest['Close'] * 0.02
    stop_loss_distance = atr_value * 2
    
    # Risk amount (1% of account by default)
    risk_amount = account_balance * (risk_percent / 100)
    
    # Position size calculation
    if stop_loss_distance > 0:
        position_size = int(risk_amount / stop_loss_distance)
    else:
        position_size = 0
    
    # Calculate stop loss and take profit levels
    current_price = latest['Close']
    stop_loss_long = current_price - stop_loss_distance
    take_profit_long = current_price + (stop_loss_distance * 2)  # 1:2 risk/reward
    
    stop_loss_short = current_price + stop_loss_distance
    take_profit_short = current_price - (stop_loss_distance * 2)
    
    return {
        'position_size': position_size,
        'stop_loss_long': stop_loss_long,
        'take_profit_long': take_profit_long,
        'stop_loss_short': stop_loss_short,
        'take_profit_short': take_profit_short,
        'risk_amount': risk_amount,
        'atr_value': atr_value
    }

def format_signal_output(signal, strength, details, position_info):
    """Format comprehensive signal output"""
    current_time = time.strftime('%Y-%m-%d %H:%M:%S')
    
    output = f"\n[{current_time}] === OPENDOOR (OPEN) ANALYSIS ===\n"
    output += f"SIGNAL: {signal} (Strength: {strength}/3)\n"
    output += f"Price: ${details['price']:.2f}\n"
    output += f"Trend Score: {details['trend_score']}/4\n"
    output += f"RSI: {details['rsi']:.1f}\n"
    output += f"Volume Confirmed: {details['volume_confirmed']}\n"
    output += f"OBV Bullish: {details['obv_bullish']}\n"
    
    if details['bullish_patterns']:
        patterns = [p.replace('BULL_', '') for p in details['bullish_patterns']]
        output += f"Bullish Patterns: {', '.join(patterns)}\n"
    
    if details['bearish_patterns']:
        patterns = [p.replace('BEAR_', '') for p in details['bearish_patterns']]
        output += f"Bearish Patterns: {', '.join(patterns)}\n"
    
    if signal in ['STRONG_BUY', 'BUY']:
        output += f"\n--- LONG POSITION SETUP ---\n"
        output += f"Recommended Position Size: {position_info['position_size']} shares\n"
        output += f"Stop Loss: ${position_info['stop_loss_long']:.2f}\n"
        output += f"Take Profit: ${position_info['take_profit_long']:.2f}\n"
        output += f"Max Risk: ${position_info['risk_amount']:.2f}\n"
    
    elif signal in ['STRONG_SELL', 'SELL']:
        output += f"\n--- SHORT POSITION SETUP ---\n"
        output += f"Recommended Position Size: {position_info['position_size']} shares\n"
        output += f"Stop Loss: ${position_info['stop_loss_short']:.2f}\n"
        output += f"Take Profit: ${position_info['take_profit_short']:.2f}\n"
        output += f"Max Risk: ${position_info['risk_amount']:.2f}\n"
    
    output += "=" * 50
    return output

def enhanced_job():
    """Main enhanced trading job with comprehensive analysis"""
    try:
        print("Fetching data...")
        data = fetch_minute_data()
        
        # Validate data structure before proceeding
        if not validate_data_structure(data):
            print("Data validation failed - skipping this cycle")
            return
        
        print("Calculating indicators...")
        data = calculate_technical_indicators(data)
        data = detect_key_patterns(data)
        
        print("Generating signals...")
        signal, strength, details = generate_enhanced_signals(data)
        
        position_info = calculate_position_sizing(data)
        
        output = format_signal_output(signal, strength, details, position_info)
        print(output)
        
    except Exception as e:
        print(f"Error during enhanced job execution: {e}")
        import traceback
        traceback.print_exc()

# Schedule the enhanced bot
def start_enhanced_bot():
    """Start the enhanced trading bot with scheduling"""
    schedule.every(1).minutes.do(enhanced_job)
    
    print("Starting Enhanced Opendoor Trading Bot...")
    print("Features:")
    print("- Multiple technical indicators (RSI, MACD, Moving Averages)")
    print("- Volume confirmation (OBV, Volume analysis)")  
    print("- Focused candlestick patterns (most reliable only)")
    print("- Trend strength scoring")
    print("- Risk management with ATR-based stop losses")
    print("- Position sizing recommendations")
    print("- Signal strength ratings (1-3)")
    print("-" * 60)
    
    while True:
        schedule.run_pending()
        time.sleep(1)




if __name__ == "__main__":
    # For testing, run once
    enhanced_job()
    
    # Uncomment to run continuously
    start_enhanced_bot()
