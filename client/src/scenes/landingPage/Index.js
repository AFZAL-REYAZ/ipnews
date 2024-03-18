
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  videoContainer: {
    marginBottom: theme.spacing(2),
  },
  newsItem: {
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
}));

const MyComponent = () => {
  const classes = useStyles();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=56582f70c63d458db036c3ae486d74c7');
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {/* Video section */}
        <Grid item xs={12} className={classes.videoContainer}>
          <Typography variant="h4" gutterBottom>
            Your Video Title
          </Typography>
          {/* Your video component goes here */}
          <video controls width="100%">
            <source src="https://youtu.be/UiUIdfb2Quo?si=xOu4Nex87pnuArjl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>

        {/* News section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Latest News
          </Typography>
          <Grid container spacing={2}>
            {news.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.newsItem}>
                  {article.urlToImage && (
                    <CardMedia
                      className={classes.media}
                      image={article.urlToImage}
                      title={article.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                      Read more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyComponent;











// import React, { useState, useEffect } from 'react';

// const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual YouTube API key
// const NEWS_API_KEY = '56582f70c63d458db036c3ae486d74c7'; // Replace with your actual News API key

// function LandingPage() {
//   const [latestVideo, setLatestVideo] = useState(null);
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch latest video from YouTube
//     const fetchLatestVideo = async () => {
//       try {     
//         const channelId = 'YOUR_CHANNEL_ID'; // Replace with your actual channel ID
//         const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${YOUTUBE_API_KEY}`;
//         const response = await fetch(url);
        
//         if (!response.ok) {
//           throw new Error(`YouTube API request failed with status ${response.status}`);
//         }
        
//         const data = await response.json();

//         if (!data.items || !data.items[0] || !data.items[0].snippet || !data.items[0].snippet.title) {
//           throw new Error('Unexpected response data format from YouTube API');
//         }

//         const videoId = data.items[0].id.videoId;
//         const videoSnippet = data.items[0].snippet;
//         setLatestVideo({ videoId, videoSnippet });
//       } catch (error) {
//         console.error('Error fetching latest video from YouTube:', error);
//         setError('Failed to fetch the latest video. Please try again later.');
//       }
//     };

//     // Fetch news from API
//     const fetchNews = async () => {
//       try {
//         const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
//         const response = await fetch(url);
        
//         if (!response.ok) {
//           throw new Error(`News API request failed with status ${response.status}`);
//         }
        
//         const data = await response.json();
//         setNews(data.articles);
//       } catch (error) {
//         console.error('Error fetching news from API:', error);
//         setError('Failed to fetch news. Please try again later.');
//       }
//     };

//     fetchLatestVideo();
//     fetchNews();
//   }, []);

//   return (
//     <>
//     <div>
//       {/* Video Section */}
//       {latestVideo && (
//         <div>
//           <h2>Latest Video</h2>
//           <iframe
//             width="560"
//             height="315"
//             src={`https://www.youtube.com/embed/${latestVideo.videoId}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="Embedded youtube"
//           />
//           <p>{latestVideo.videoSnippet.title}</p>
//         </div>
//       )}

//       {/* News Section */}
//       <div>
//         <h2>Latest News</h2>
//         {news.length > 0 ? (
//           <ul>
//             {news.map((article, index) => (
//               <li key={index}>
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No news available</p>
//         )}
//       </div>

//       {/* Error Handling */}
//       {error && <p>Error: {error}</p>}
//     </div>
//     </>
//   );
// }

// export default LandingPage;
