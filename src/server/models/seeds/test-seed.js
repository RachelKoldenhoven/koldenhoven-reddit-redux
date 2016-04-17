/**
 * Created by rachelkoldenhoven on 4/17/16.
 */
var Post = require('../posts');

var data = [
  {
    title: 'Krakatau',
    author: 'Michael Lava',
    text: 'Anak Krakatau has grown at an average rate of five inches (13 cm) per week since the 1950s. This equates to an average growth of 6.8 meters per year. The island is still active, with its most recent eruptive episode having begun in 1994. Quiet periods of a few days have alternated with almost continuous Strombolian eruptions since then.',
    date: '1459735188405',
    comments: [
      {
        user: 'Rachel',
        comment: 'It was amazing to camp at the foot of an active volcano!'
      },
      {
        user: 'Brent',
        comment: 'Watch out for the giant monitor lizards!  Biawak!'
      }
    ],
    image: 'http://i.dailymail.co.uk/i/pix/2009/07/30/article-1203028-05E123F2000005DC-251_964x517.jpg'
  }
];

function runSeed(done) {
  var post = new Post(data[0]);
  post.save()
    .then(function(){
      console.log('seed');
      done();
    });
}


module.exports = {
  runSeed: runSeed
};


