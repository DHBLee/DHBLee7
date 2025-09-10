import Image from 'next/image'

const catgoeryUI = ({icon, text, value}) => {
  return (
    <div className="flex items-center gap-2">
        <Image 
            src={icon} 
            alt={text} 
            width={16} 
            height={16} 
        />
        <span className="text-preset7 text-Neutral700">
            {text} {value} {text !== "Servings:" ? "mins" : ""}
        </span>
    </div>
  )
}

export default catgoeryUI