export const Heading = ({ title, description }) => {
    return (<div className='w-full max-w-fit'>
      <h2 className='text-lg font-extrabold tracking-tight'>{title}</h2>
      {description &&
            (typeof description === 'string' ? (<p className='text-sm text-muted-foreground'>{description}</p>) : (<div className='mt-2 grid grid-cols-2 flex-wrap items-center gap-2 text-xs md:flex'>
            {Object.entries(description).map(([key, value]) => (<div key={key} className='flex items-start gap-1'>
                <span className='text-muted-foreground'>{key}:</span>
                <span>{value}</span>
              </div>))}
          </div>))}
    </div>);
};
