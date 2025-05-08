import { connectToDatabase, MONGODB_URI, MONGODB_DB_NAME } from '../lib/mongodb';
import { Article } from '../lib/models';
import { Collection, Db } from 'mongodb';

const articlesData: Omit<Article, '_id' | 'createdAt'>[] = [
    {
      source: "Dainik Bhaskar UP",
      title: "सोली मेरवान कामा का नया प्रोजेक्ट \"क्या मैं गलत?\" एसएमसी म्यूज़िक के बैनर तले कान्स में होगा प्रीमियर",
      description: "एसएमसी म्यूज़िक के बैनर तले सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' कान्स में प्रीमियर के लिए तैयार है और हॉटस्टार पर रिलीज़ होगा।",
      link: "https://dainikbhaskarup.com/soli-merwan-camas-new-project-am-i-wrong-will-premiere-in-cannes-under-the-banner-of-smc-music-will-be-released-on-hotstar/",
      date: "Apr 17, 2025",
    },
    {
      source: "Mid-Day",
      title: "Soli Merwan Cama: The Visionary Producer Redefining Bollywood's Global Footprint",
      description: "Highlighting Soli Merwan Cama's significant impact on expanding Bollywood's reach internationally.",
      link: "https://www.mid-day.com/amp/buzz/article/soli-merwan-cama-the-visionary-producer-redefining-bollywoods-global-footprint-5081",
      date: "Apr 16, 2025",
    },
    {
      source: "First India",
      title: "Soli Merwan Cama: The Visionary Producer Redefining Bollywood's Global Footprint",
      description: "A press release detailing Soli Merwan Cama's influential role within the Bollywood industry globally.",
      link: "https://firstindia.co.in/news/press-releases/soli-merwan-cama-the-visionary-producer-redefining-bollywoods-global-footprint",
      date: "Apr 15, 2025",
    },
    {
      source: "Live Hindustan",
      title: "सोली मेरवान कामा का नया प्रोजेक्ट क्या मैं गलत कान्स में होगा प्रीमियर",
      description: "एसएमसी म्यूज़िक का प्रोजेक्ट 'क्या मैं गलत?' कान्स फिल्म फेस्टिवल 2024 में प्रीमियर के लिए तैयार है।",
      link: "https://www.livehindustan.com/jharkhand/chaibasa/story-smc-music-s-am-i-wrong-set-to-premiere-at-cannes-film-festival-201741260525966.html",
      date: "Apr 14, 2025",
    },
    {
      source: "Hindi Mid-Day",
      title: "सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' एसएमसी म्यूजिक के बैनर तले कांस में होगा प्रीमियर",
      description: "एसएमसी म्यूजिक के तहत सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' कांस में प्रीमियर होगा और हॉटस्टार पर रिलीज होगा।",
      link: "https://hindi.mid-day.com/bespoke-stories/media-and-entertainment/article/soli-merwan-kamas-new-project-am-i-wrong-under-the-banner-of-smc-music-will-premiere-at-cannes-will-be-released-on-hotstar-41",
      date: "Apr 13, 2025",
    },
    {
      source: "Hindi Saamana",
      title: "'क्या मैं गलत?' कान्स में प्रीमियर के लिए तैयार",
      description: "'क्या मैं गलत?' फिल्म कान्स फिल्म फेस्टिवल में प्रीमियर के लिए तैयार है।",
      link: "https://www.hindisaamana.com/kya-main-galat-to-premiere-at-cannes/",
      date: "Apr 12, 2025",
    },
    {
      source: "Filmy Town",
      title: "Soli Merwan Cama's music 'Kya Main Galat' under SMC Music's banner to premiere at Cannes, releasing on Hotstar!",
      description: "Details on the Cannes premiere and Hotstar release for Soli Merwan Cama's 'Kya Main Galat'.",
      link: "https://filmytown.com/soli-merwan-camas-music-kya-main-galat-under-smc-musics-banner-to-premiere-at-cannes-releasing-on-hotstar/",
      date: "Apr 11, 2025",
    },
    {
      source: "UP18 News",
      title: "नया रिकॉर्ड बनाने के लिए तैयार है सोली मेरवान कामा का नया प्रोजेक्ट \"क्या मैं गलत?\"",
      description: "सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' नया रिकॉर्ड बनाने की उम्मीद जगा रहा है।",
      link: "https://up18news.com/solie-merwan-camas-new-project-is-ready-to-create-a-new-record-are-i-wrong/",
      date: "Apr 10, 2025",
    },
    {
      source: "Forbes India",
      title: "Soli Merwan Cama's Journey: From Dark Days To A Millionaire Dream",
      description: "Forbes India covers the inspiring journey of Soli Merwan Cama's rise to success against the odds.",
      link: "https://www.forbesindia.com/article/brand-connect/soli-merwan-camas-journey-from-dark-days-to-a-millionaire-dream/95740/1",
      date: "Feb 15, 2024",
    },
    {
      source: "Hindustan Times",
      title: "SMC Music Company introduces 'Gold Over Love - Dilon Ka Sauda'",
      description: "Hindustan Times reports on the launch of a new music release from SMC Music Company.",
      link: "https://www.hindustantimes.com/genesis/smc-music-company-introduces-gold-over-love-dilon-ka-sauda-101744203797393.html",
      date: "Apr 05, 2024",
    }
  ];

async function seedArticles() {
  if (!MONGODB_URI || !MONGODB_DB_NAME) {
    throw new Error('Please define the MONGODB_URI and MONGODB_DB_NAME environment variables inside .env.local');
  }

  let client;
  try {
    client = await connectToDatabase();
    const db: Db = client.db(MONGODB_DB_NAME);
    const articlesCollection: Collection<Article> = db.collection<Article>('articles');

    console.log('Attempting to delete existing articles...');
    const deleteResult = await articlesCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} articles.`);

    console.log('Inserting new articles...');
    const articlesToInsert = articlesData.map(article => ({
      ...article,
      createdAt: new Date(),
    }));
    
    if (articlesToInsert.length > 0) {
        const insertResult = await articlesCollection.insertMany(articlesToInsert);
        console.log(`Successfully inserted ${insertResult.insertedCount} articles.`);
    } else {
        console.log('No articles to insert.');
    }

  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed.');
    }
  }
}

seedArticles(); 