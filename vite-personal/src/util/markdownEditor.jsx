import React from 'react'

// Configuration for different syntax highlighters
const SYNTAX_HIGHLIGHTERS = {
  html: highlightHTML,
  // Easy to extend: css: highlightCSS, js: highlightJS, etc.
}

// Optimized utility functions
const utils = {
  // Memoized newline conversion
  convertNewlines: (() => {
    const cache = new Map()
    return (str) => {
      if (typeof str !== 'string') return str
      if (cache.has(str)) return cache.get(str)
      
      const parts = str.split('\n')
      if (parts.length === 1) {
        cache.set(str, str)
        return str
      }
      
      const result = parts.reduce((acc, part, index) => {
        if (index === 0) return [part]
        return [...acc, <br key={`br-${index}`} />, part]
      }, [])
      
      cache.set(str, result)
      return result
    }
  })(),

  // Generate unique keys efficiently
  generateKey: (prefix, ...indices) => `${prefix}-${indices.join('-')}`,

  // Check if text contains pattern without regex
  hasPattern: (text, pattern) => text.includes(pattern),

  // Split text while preserving structure
  smartSplit: (text, delimiter) => {
    const parts = text.split(delimiter)
    return parts.length > 1 ? parts : null
  }
}

// Modular syntax highlighter for HTML
function highlightHTML(code) {
  const lines = code.split('\n')
  
  return lines.map((line, lineIndex) => {
    if (!line.trim()) {
      return (
        <React.Fragment key={lineIndex}>
          {line}
          {lineIndex < lines.length - 1 && '\n'}
        </React.Fragment>
      )
    }
    
    return (
      <React.Fragment key={lineIndex}>
        {parseHTMLLine(line, lineIndex)}
        {lineIndex < lines.length - 1 && '\n'}
      </React.Fragment>
    )
  })
}

// Optimized HTML line parser
function parseHTMLLine(line, lineIndex) {
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)(\s+[^>]*)?>/g
  const parts = []
  let lastIndex = 0
  let match
  
  while ((match = tagRegex.exec(line)) !== null) {
    // Add text before tag
    if (match.index > lastIndex) {
      parts.push(line.substring(lastIndex, match.index))
    }
    
    // Add highlighted tag
    parts.push(createHighlightedTag(match, lineIndex))
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < line.length) {
    parts.push(line.substring(lastIndex))
  }
  
  return parts.length > 0 ? parts : line
}

// Create highlighted HTML tag
function createHighlightedTag(match, lineIndex) {
  const [fullTag, tagName, attributes = ''] = match
  const tagKey = utils.generateKey('tag', lineIndex, match.index)
  
  const elements = [
    '<',
    fullTag.startsWith('</') && '/',
    <span key={tagKey} className="text-orange-400">{tagName}</span>,
    attributes && parseAttributes(attributes, lineIndex, match.index),
    '>'
  ].filter(Boolean)
  
  return (
    <React.Fragment key={utils.generateKey('tag-wrapper', lineIndex, match.index)}>
      {elements}
    </React.Fragment>
  )
}

// Parse HTML attributes efficiently
function parseAttributes(attributes, lineIndex, tagIndex) {
  const attrRegex = /(\s+)(\w+)(=)(["'])(.*?)(["'])/g
  const elements = []
  let lastIndex = 0
  let match
  
  while ((match = attrRegex.exec(attributes)) !== null) {
    const [fullMatch, whitespace, attrName, equals, openQuote, value, closeQuote] = match
    
    // Add any text before this attribute
    if (match.index > lastIndex) {
      elements.push(attributes.substring(lastIndex, match.index))
    }
    
    // Add attribute parts
    elements.push(
      whitespace,
      <span 
        key={utils.generateKey('attr', lineIndex, tagIndex, match.index)} 
        className={['id', 'class'].includes(attrName) ? 'text-purple-400' : 'text-orange-400'}
      >
        {attrName}
      </span>,
      equals,
      <span key={utils.generateKey('val', lineIndex, tagIndex, match.index)} className="text-blue-400">
        {openQuote}{value}{closeQuote}
      </span>
    )
    
    lastIndex = match.index + fullMatch.length
  }
  
  // Add remaining attribute text
  if (lastIndex < attributes.length) {
    elements.push(attributes.substring(lastIndex))
  }
  
  return elements
}

// Block parser registry for extensibility
const BLOCK_PARSERS = [
  { name: 'codeBlock', parser: parseCodeBlock },
  { name: 'headers', parser: parseHeaders },
  { name: 'horizontalRule', parser: parseHorizontalRule },
  { name: 'blockquote', parser: parseBlockquote },
  { name: 'lists', parser: parseLists },
  { name: 'table', parser: parseTable },
  { name: 'paragraph', parser: parseParagraph } // Default fallback
]

// Main markdown parser with optimized block processing
export const parseMarkdown = (content) => {
  if (!content) return null
  
  const blocks = content.split('\n\n')
  return blocks.map((block, index) => {
    // Find the first parser that can handle this block
    for (const { parser } of BLOCK_PARSERS) {
      const result = parser(block, index)
      if (result) return result
    }
    return null // Should never reach here due to paragraph fallback
  }).filter(Boolean)
}

// Modular block parsers
function parseCodeBlock(block, index) {
  if (!block.startsWith('```')) return null
  
  const lines = block.split('\n')
  const language = lines[0].substring(3).trim() || 'text'
  const codeContent = lines.slice(1, -1).join('\n')
  
  const highlighter = SYNTAX_HIGHLIGHTERS[language]
  const content = highlighter ? highlighter(codeContent) : codeContent
  
  return (
    <div key={index} className="my-6">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language} text-sm leading-relaxed`}>
          {content}
        </code>
      </pre>
    </div>
  )
}

function parseHeaders(block, index) {
  const headerConfigs = [
    { prefix: '###### ', tag: 'h6', className: 'H7 mt-6 mb-3 dark:text-Neutral0' },
    { prefix: '##### ', tag: 'h5', className: 'H6 mt-6 mb-3 dark:text-Neutral0' },
    { prefix: '#### ', tag: 'h4', className: 'H5 mt-6 mb-3 dark:text-Neutral0' },
    { prefix: '### ', tag: 'h3', className: 'H4 mt-6 mb-3 dark:text-Neutral0' },
    { prefix: '## ', tag: 'h2', className: 'H3 mt-8 mb-4 dark:text-Neutral0' },
    { prefix: '# ', tag: 'h1', className: 'H1 mt-8 mb-4 dark:text-Neutral0' }
  ]
  
  for (const { prefix, tag, className } of headerConfigs) {
    if (block.startsWith(prefix)) {
      const HeaderTag = tag
      return (
        <HeaderTag key={index} className={className}>
          {parseInlineMarkdown(block.substring(prefix.length))}
        </HeaderTag>
      )
    }
  }
  return null
}

function parseHorizontalRule(block, index) {
  return block === '---' ? <hr key={index} className="my-8 border-gray-300" /> : null
}

function parseBlockquote(block, index) {
  if (!block.startsWith('> ')) return null
  
  const quoteContent = block
    .split('\n')
    .map(line => line.startsWith('> ') ? line.substring(2) : line)
    .join('\n')
  
  return (
    <blockquote key={index} className="border-l-4 border-gray-500 pl-4 py-2 my-4 italic text-gray-600">
      {parseInlineMarkdown(quoteContent)}
    </blockquote>
  )
}

function parseLists(block, index) {
  // Unordered list
  if (block.startsWith('- ')) {
    const items = block.split('\n')
    return (
      <ul key={index} className="H7 text-Neutral600 dark:text-Neutral400 list-disc pl-8 my-4 space-y-2">
        {items.map((item, i) => (
          <li key={i}>{parseInlineMarkdown(item.substring(2))}</li>
        ))}
      </ul>
    )
  }
  
  // Ordered list
  if (/^\d+\.\s/.test(block)) {
    const items = block.split('\n')
    return (
      <ol key={index} className="H7 text-Neutral600 dark:text-Neutral400 list-decimal pl-8 my-4 space-y-2">
        {items.map((item, i) => {
          const match = item.match(/^\d+\.\s(.*)/)
          return (
            <li key={i}>
              {match ? parseInlineMarkdown(match[1]) : parseInlineMarkdown(item)}
            </li>
          )
        })}
      </ol>
    )
  }
  
  return null
}

function parseTable(block, index) {
  if (!utils.hasPattern(block, '|') || block.split('\n').length <= 1) return null
  
  const lines = block.split('\n')
  const [headerLine, separatorLine, ...dataLines] = lines
  
  // Validate table structure
  if (!separatorLine?.includes('-') || !separatorLine.includes('|')) return null
  
  const headers = headerLine.split('|').map(cell => cell.trim()).filter(Boolean)
  const rows = dataLines
    .map(line => line.split('|').map(cell => cell.trim()).filter(Boolean))
    .filter(row => row.length > 0)
  
  return (
    <div key={index} className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, i) => (
              <th key={i} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                {parseInlineMarkdown(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="border border-gray-300 px-4 py-2">
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function parseParagraph(block, index) {
  // This is the fallback parser - always returns a result
  return (
    <p key={index} className="text-Neutral600 dark:text-Neutral400 H7 my-4 leading-relaxed">
      {parseInlineMarkdown(block)}
    </p>
  )
}
  
// Inline formatting token definitions
const INLINE_TOKENS = [
  { 
    name: 'code', 
    pattern: '`', 
    render: (content, key) => (
      <code key={key} className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {content}
      </code>
    )
  },
  { 
    name: 'bold', 
    pattern: '**',
    render: (content, key) => (
      <strong key={key} className="font-bold">
        {parseInlineTokens(content, key)}
      </strong>
    )
  },
  { 
    name: 'italic', 
    pattern: '*', 
    render: (content, key) => (
      <em key={key} className="italic">
        {parseInlineTokens(content, key)}
      </em>
    )
  }
]

// Optimized inline markdown parser
const parseInlineMarkdown = (text) => {
  if (!text) return null
  return parseInlineTokens(text)
}

// Token-based parsing with precedence handling
function parseInlineTokens(text, baseKey = '', inBold = false) {
  if (!text) return text
  
  // Handle bold text specifically
  if (typeof text === 'string' && text.includes('**')) {
    const parts = [];
    let current = '';
    let inBoldSection = false;
    
    // Process the text character by character
    for (let i = 0; i < text.length; i++) {
      // Check if we found **
      if (text[i] === '*' && text[i + 1] === '*') {
        // Add the current text as a part
        if (current) {
          parts.push({
            text: current,
            isBold: inBoldSection
          });
          current = '';
        }
        // Toggle bold section
        inBoldSection = !inBoldSection;
        i++; // Skip the next *
      } else {
        current += text[i];
      }
    }
    
    // Add any remaining text
    if (current) {
      parts.push({
        text: current,
        isBold: inBoldSection
      });
    }
    
    // Only process if we actually found some bold sections
    if (parts.some(part => part.isBold)) {
      return parts.map((part, index) => {
        if (!part.isBold) return part.text;
        return (
          <strong key={`${baseKey}-bold-${index}`} className="font-bold">
            {parseInlineTokens(part.text, `${baseKey}-b-${index}`, true)}
          </strong>
        );
      });
    }
  }
  
  // Original token parsing for other cases
  for (const token of INLINE_TOKENS) {
    const parts = utils.smartSplit(text, token.pattern);
    if (parts) {
      return parts.map((part, index) => {
        const key = utils.generateKey(token.name, baseKey, index);
        
        if (index % 2 === 1) {
          // This part is wrapped by the token
          return token.render(part, key);
        } else {
          // This part is not wrapped, continue parsing other tokens
          return token.name === 'code' 
            ? part // Don't parse inside code blocks
            : parseInlineTokens(part, key);
        }
      });
    }
  }
  
  // No tokens found, handle newlines and return
  const converted = utils.convertNewlines(text)
  return Array.isArray(converted) ? <>{converted}</> : converted
}