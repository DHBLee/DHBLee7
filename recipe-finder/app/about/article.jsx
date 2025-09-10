export default function Article({title, articledata}) {
    return (
        <>
              <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-Neutral300"></div>
            <article className="grid grid-cols-1 lg:grid-cols-[40%_1fr] lg:items-start lg:justify-between gap-[40px] py-[48px] md:py-[80px] lg:py-[96px]">
                
                <h2 className="text-preset2 text-Neutral900">{title}</h2>
                <ul className="list-with-arrow flex flex-col items-start justify-start gap-6">
                    {articledata.map((article) => (
                        <li key={article.title}>
                            <h3 className="text-preset4 text-Neutral900">{article.title}</h3>
                            <p className="text-preset6 text-Neutral800">{article.description}</p>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}