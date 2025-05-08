import clientPromise from '../lib/mongodb'; // Use the client promise
import { GalleryImage, Article } from '../lib/models'; // Import interfaces/types
import dotenv from 'dotenv';
import { MongoClient, Document } from 'mongodb'; // Import MongoClient and Document

dotenv.config({ path: '.env.local' }); // Load environment variables


// Convert article date field to string (ISO format)
const articlesData: Omit<Article, '_id'>[] = [
  {
    source: "Dainik Bhaskar UP",
    title: "सोली मेरवान कामा का नया प्रोजेक्ट \"क्या मैं गलत?\" एसएमसी म्यूज़िक के बैनर तले कान्स में होगा प्रीमियर",
    description: "एसएमसी म्यूज़िक के बैनर तले सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' कान्स में प्रीमियर के लिए तैयार है और हॉटस्टार पर रिलीज़ होगा।",
    link: "https://dainikbhaskarup.com/soli-merwan-camas-new-project-am-i-wrong-will-premiere-in-cannes-under-the-banner-of-smc-music-will-be-released-on-hotstar/",
    date: new Date("2025-04-17").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-17") // Keep as Date object
  },
  {
    source: "Mid-Day",
    title: "Soli Merwan Cama: The Visionary Producer Redefining Bollywood's Global Footprint",
    description: "Highlighting Soli Merwan Cama's significant impact on expanding Bollywood's reach internationally.",
    link: "https://www.mid-day.com/amp/buzz/article/soli-merwan-cama-the-visionary-producer-redefining-bollywoods-global-footprint-5081",
    date: new Date("2025-04-16").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-16")
  },
  {
    source: "First India",
    title: "Soli Merwan Cama: The Visionary Producer Redefining Bollywood's Global Footprint",
    description: "A press release detailing Soli Merwan Cama's influential role within the Bollywood industry globally.",
    link: "https://firstindia.co.in/news/press-releases/soli-merwan-cama-the-visionary-producer-redefining-bollywoods-global-footprint",
    date: new Date("2025-04-15").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-15")
  },
  {
    source: "Live Hindustan",
    title: "सोली मेरवान कामा का नया प्रोजेक्ट क्या मैं गलत कान्स में होगा प्रीमियर",
    description: "एसएमसी म्यूज़िक का प्रोजेक्ट 'क्या मैं गलत?' कान्स फिल्म फेस्टिवल 2024 में प्रीमियर के लिए तैयार है।",
    link: "https://www.livehindustan.com/jharkhand/chaibasa/story-smc-music-s-am-i-wrong-set-to-premiere-at-cannes-film-festival-201741260525966.html",
    date: new Date("2025-04-14").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-14")
  },
  {
    source: "Hindi Mid-Day",
    title: "सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' एसएमसी म्यूजिक के बैनर तले कांस में होगा प्रीमियर",
    description: "एसएमसी म्यूजिक के तहत सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' कांस में प्रीमियर होगा और हॉटस्टार पर रिलीज होगा।",
    link: "https://hindi.mid-day.com/bespoke-stories/media-and-entertainment/article/soli-merwan-kamas-new-project-am-i-wrong-under-the-banner-of-smc-music-will-premiere-at-cannes-will-be-released-on-hotstar-41",
    date: new Date("2025-04-13").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-13")
  },
  {
    source: "Hindi Saamana",
    title: "'क्या मैं गलत?' कान्स में प्रीमियर के लिए तैयार",
    description: "'क्या मैं गलत?' फिल्म कान्स फिल्म फेस्टिवल में प्रीमियर के लिए तैयार है।",
    link: "https://www.hindisaamana.com/kya-main-galat-to-premiere-at-cannes/",
    date: new Date("2025-04-12").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-12")
  },
  {
    source: "Filmy Town",
    title: "Soli Merwan Cama's music 'Kya Main Galat' under SMC Music's banner to premiere at Cannes, releasing on Hotstar!",
    description: "Details on the Cannes premiere and Hotstar release for Soli Merwan Cama's 'Kya Main Galat'.",
    link: "https://filmytown.com/soli-merwan-camas-music-kya-main-galat-under-smc-musics-banner-to-premiere-at-cannes-releasing-on-hotstar/",
    date: new Date("2025-04-11").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-11")
  },
  {
    source: "UP18 News",
    title: "नया रिकॉर्ड बनाने के लिए तैयार है सोली मेरवान कामा का नया प्रोजेक्ट \"क्या मैं गलत?\"",
    description: "सोली मेरवान कामा का नया प्रोजेक्ट 'क्या मैं गलत?' नया रिकॉर्ड बनाने की उम्मीद जगा रहा है।",
    link: "https://up18news.com/solie-merwan-camas-new-project-is-ready-to-create-a-new-record-are-i-wrong/",
    date: new Date("2025-04-10").toISOString(), // Convert to ISO string
    createdAt: new Date("2025-04-10")
  },
  {
    source: "Forbes India",
    title: "Soli Merwan Cama's Journey: From Dark Days To A Millionaire Dream",
    description: "Forbes India covers the inspiring journey of Soli Merwan Cama's rise to success against the odds.",
    link: "https://www.forbesindia.com/article/brand-connect/soli-merwan-camas-journey-from-dark-days-to-a-millionaire-dream/95740/1",
    date: new Date("2024-02-15").toISOString(), // Convert to ISO string
    createdAt: new Date("2024-02-15")
  },
  {
    source: "Hindustan Times",
    title: "SMC Music Company introduces 'Gold Over Love - Dilon Ka Sauda'",
    description: "Hindustan Times reports on the launch of a new music release from SMC Music Company.",
    link: "https://www.hindustantimes.com/genesis/smc-music-company-introduces-gold-over-love-dilon-ka-sauda-101744203797393.html",
    date: new Date("2024-04-05").toISOString(), // Convert to ISO string
    createdAt: new Date("2024-04-05")
  }
];

async function seedDatabase() {
  let client: MongoClient | null = null;
  try {
    console.log('Connecting to database...');
    client = await clientPromise;
    const db = client.db();
    console.log('Connected to database.');

    // Use Document type for broader compatibility during insertion
    const articlesCollection = db.collection<Document>('articles');

    console.log('Clearing existing data...');
    await articlesCollection.deleteMany({});
    console.log('Existing data cleared.');

    console.log('Seeding articles...');
     // Assert data matches Omit<Article, '_id'> before insertion if needed, but Document type handles it.
    const articlesResult = await articlesCollection.insertMany(articlesData as any[]); // Use 'as any[]' to bypass strict type checking if issues persist
    console.log(`${articlesResult.insertedCount} articles seeded.`);

    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (client) {
      console.log('Database connection managed (potentially pooled).');
      // Close handled by clientPromise typically
    }
  }
}

seedDatabase(); 