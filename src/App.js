import React, {lazy, useState, useEffect} from 'react';

const importView = subreddit => 
  lazy(() => 
    import(`./views/${subreddit}View`).catch(() => import('./views/NullView'))
  )
;

// const searchSubreddit = async query =>
// fetch(`https://www.reddit.com/search.json?q=${query}`).then(_ => _.json());


const searchSubreddit = async query =>  ({
  data: {
    children: [
      {
        data: {
          subreddit: 'reactjs',
          title: 'Really good tutorial on using react hooks',
          url: 'https://www.robinwieruch.de/react-hooks-fetch-data/'
        }
      },
      {
        data: {
          subreddit: 'javascript',
          title: '[Re-Post] React Hook Form',
          url: 'https://react-hook-form.com/'
        }
      },
      {
        data: {
          subreddit: 'pics',
          title: 'Dogs vs. Cats',
          url: 'https://www.reddit.com/r/pics/comments/6qbo91'
        }
      }
    ]
  }
});

export default function App({ subredditsToShow }) {
  const [views, setViews] = useState([]);

  const extractDataFromSearchResult = response =>
    response.data.children.map(({ data }) => data);

  useEffect(() => {
    async function loadData() {
      
      const subredditsToShow = await searchSubreddit('react hooks').then(
        extractDataFromSearchResult
      );
      console.log(subredditsToShow, "subredditsToShow");
      const componentPromises = subredditsToShow.map( async (data, index) => {
        const View = await importView(data.subreddit);
        console.log(data, "data");

        return <View key={index} {...data}/>;
      });
    
      Promise.all(componentPromises).then(setViews);
  }
  loadData();
  }, [subredditsToShow]);

  return (
    <React.Suspense fallback="Loading views...">
      <div className="container">{views}</div>
    </React.Suspense>
  );
}
