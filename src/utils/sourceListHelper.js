import { nanoid } from 'nanoid';

const sourceListHelper = sources => {
  // This still has a bug if the url has a . anywhere besides www. and .com
  function getDomain(url) {
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
    url = url.split('.');
    url = url.slice(url.length - 2).join('.');
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  }

  return (
    <div>
      {!sources || sources === [] ? (
        <p>No sources listed</p>
      ) : (
        sources.map(source => {
          return (
            <div key={nanoid()}>
              <a href={source} target="_blank" rel="noopener noreferrer">
                {getDomain(source)}
              </a>
              <br />
            </div>
          );
        })
      )}
    </div>
  );
};

export default sourceListHelper;
