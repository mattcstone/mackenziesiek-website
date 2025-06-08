import { db } from "./db";
import { neighborhoods } from "@shared/schema";

const charlotteNeighborhoods = [
  // Additional In-Town Core Neighborhoods
  { name: "Wesley Heights", slug: "wesley-heights", description: "Family-friendly neighborhood with tree-lined streets and proximity to downtown Charlotte.", avgPrice: "$395,000", walkScore: 65, agentId: 1 },
  { name: "Elizabeth", slug: "elizabeth", description: "Historic neighborhood known for charming architecture and proximity to the city center.", avgPrice: "$445,000", walkScore: 72, agentId: 1 },
  { name: "Chantilly", slug: "chantilly", description: "Historic neighborhood featuring beautiful early 20th century homes.", avgPrice: "$385,000", walkScore: 65, agentId: 1 },
  { name: "Sedgefield", slug: "sedgefield", description: "Historic neighborhood with tree-lined streets and walkable community feel.", avgPrice: "$365,000", walkScore: 68, agentId: 1 },
  { name: "Optimist Park", slug: "optimist-park", description: "Revitalizing neighborhood near NoDa with authentic Charlotte character.", avgPrice: "$385,000", walkScore: 72, agentId: 1 },
  
  // Historic & Established Neighborhoods
  { name: "Eastover", slug: "eastover", description: "One of Charlotte's most prestigious neighborhoods with luxury estates.", avgPrice: "$1,200,000", walkScore: 45, agentId: 1 },
  { name: "Cotswold", slug: "cotswold", description: "Established neighborhood known for excellent schools and family atmosphere.", avgPrice: "$485,000", walkScore: 58, agentId: 1 },
  { name: "Providence", slug: "providence", description: "Desirable suburban neighborhood with excellent amenities.", avgPrice: "$425,000", walkScore: 52, agentId: 1 },
  
  // South Charlotte Communities
  { name: "Ballantyne", slug: "ballantyne", description: "Master-planned community in South Charlotte with upscale amenities.", avgPrice: "$565,000", walkScore: 35, agentId: 1 },
  { name: "StoneCrest", slug: "stonecrest", description: "Family-oriented community with excellent schools in South Charlotte.", avgPrice: "$485,000", walkScore: 28, agentId: 1 },
  { name: "Blakeney", slug: "blakeney", description: "Upscale neighborhood near shopping and dining in South Charlotte.", avgPrice: "$525,000", walkScore: 32, agentId: 1 },
  { name: "Rea Farms", slug: "rea-farms", description: "New development community with modern homes and amenities.", avgPrice: "$645,000", walkScore: 25, agentId: 1 },
  { name: "Waverly", slug: "waverly", description: "Family-friendly neighborhood with parks and community amenities.", avgPrice: "$385,000", walkScore: 35, agentId: 1 },
  
  // University Area
  { name: "University City", slug: "university-city", description: "Growing area near UNC Charlotte with diverse housing options.", avgPrice: "$325,000", walkScore: 65, agentId: 1 },
  { name: "University Area", slug: "university-area", description: "Student-friendly area with affordable housing near the university.", avgPrice: "$295,000", walkScore: 68, agentId: 1 },
  { name: "University Research Park", slug: "university-research-park", description: "Professional community near UNC Charlotte and research facilities.", avgPrice: "$385,000", walkScore: 45, agentId: 1 },
  
  // North Charlotte
  { name: "North Davidson", slug: "north-davidson", description: "Emerging neighborhood with development opportunities.", avgPrice: "$285,000", walkScore: 55, agentId: 1 },
  { name: "Villa Heights", slug: "villa-heights", description: "Up-and-coming area with revitalization efforts.", avgPrice: "$335,000", walkScore: 62, agentId: 1 },
  { name: "Belmont", slug: "belmont", description: "Historic small town atmosphere with access to Charlotte amenities.", avgPrice: "$385,000", walkScore: 45, agentId: 1 },
  
  // East Charlotte
  { name: "Matthews", slug: "matthews", description: "Family-oriented suburban community with excellent schools.", avgPrice: "$425,000", walkScore: 42, agentId: 1 },
  { name: "Mint Hill", slug: "mint-hill", description: "Family community with suburban feel and good schools.", avgPrice: "$395,000", walkScore: 25, agentId: 1 },
  { name: "Indian Trail", slug: "indian-trail", description: "Growing family community with new developments.", avgPrice: "$365,000", walkScore: 22, agentId: 1 },
  { name: "Stallings", slug: "stallings", description: "Small town feel with family-friendly amenities.", avgPrice: "$385,000", walkScore: 20, agentId: 1 },
  
  // West Charlotte
  { name: "West End", slug: "west-end", description: "Historic neighborhood with ongoing revitalization efforts.", avgPrice: "$285,000", walkScore: 58, agentId: 1 },
  { name: "Enderly Park", slug: "enderly-park", description: "Revitalizing neighborhood with community investment.", avgPrice: "$325,000", walkScore: 65, agentId: 1 },
  { name: "Seversville", slug: "seversville", description: "Historic neighborhood near downtown with character homes.", avgPrice: "$295,000", walkScore: 68, agentId: 1 },
  { name: "Biddleville", slug: "biddleville", description: "Historic neighborhood with cultural significance.", avgPrice: "$265,000", walkScore: 62, agentId: 1 },
  
  // South Park Area
  { name: "South Park", slug: "south-park", description: "Upscale area centered around premier shopping destination.", avgPrice: "$625,000", walkScore: 48, agentId: 1 },
  { name: "Park Road", slug: "park-road", description: "Shopping corridor with convenient access to amenities.", avgPrice: "$485,000", walkScore: 55, agentId: 1 },
  { name: "Montford", slug: "montford", description: "Established neighborhood with mature trees and character.", avgPrice: "$565,000", walkScore: 45, agentId: 1 },
  
  // Steele Creek Area
  { name: "Steele Creek", slug: "steele-creek", description: "Growing suburban area with new development.", avgPrice: "$385,000", walkScore: 25, agentId: 1 },
  { name: "Berewick", slug: "berewick", description: "Master-planned community with resort-style amenities.", avgPrice: "$425,000", walkScore: 22, agentId: 1 },
  
  // Additional Neighborhoods
  { name: "Camp North End", slug: "camp-north-end", description: "Creative district in converted industrial space.", avgPrice: "$425,000", walkScore: 68, agentId: 1 },
  { name: "Belmont-Central", slug: "belmont-central", description: "Emerging neighborhood with development potential.", avgPrice: "$295,000", walkScore: 58, agentId: 1 },
  { name: "Historic West End", slug: "historic-west-end", description: "Historic neighborhood with preserved architecture.", avgPrice: "$335,000", walkScore: 65, agentId: 1 },
  { name: "Grier Heights", slug: "grier-heights", description: "Affordable neighborhood with community character.", avgPrice: "$285,000", walkScore: 55, agentId: 1 },
  { name: "Cherry", slug: "cherry", description: "Family neighborhood with parks and schools.", avgPrice: "$365,000", walkScore: 48, agentId: 1 },
  { name: "Brookshire", slug: "brookshire", description: "Rural community with country living near Charlotte.", avgPrice: "$275,000", walkScore: 15, agentId: 1 },
  { name: "Davidson", slug: "davidson", description: "Charming college town with historic downtown.", avgPrice: "$625,000", walkScore: 55, agentId: 1 },
  { name: "Cornelius", slug: "cornelius", description: "Lake Norman community with waterfront lifestyle.", avgPrice: "$545,000", walkScore: 35, agentId: 1 },
  { name: "Huntersville", slug: "huntersville", description: "Family-oriented suburb with excellent schools.", avgPrice: "$465,000", walkScore: 38, agentId: 1 },
  { name: "Mooresville", slug: "mooresville", description: "Lake Norman area known as 'Race City USA'.", avgPrice: "$385,000", walkScore: 42, agentId: 1 },
  
  // Additional South Neighborhoods
  { name: "Pineville", slug: "pineville", description: "Historic town with small-town charm near Charlotte.", avgPrice: "$365,000", walkScore: 45, agentId: 1 },
  { name: "Fort Mill", slug: "fort-mill", description: "South Carolina suburb with excellent schools.", avgPrice: "$425,000", walkScore: 35, agentId: 1 },
  { name: "Rock Hill", slug: "rock-hill", description: "South Carolina city with college town atmosphere.", avgPrice: "$285,000", walkScore: 42, agentId: 1 },
  { name: "Tega Cay", slug: "tega-cay", description: "Lake community in South Carolina with waterfront living.", avgPrice: "$485,000", walkScore: 25, agentId: 1 },
  { name: "Weddington", slug: "weddington", description: "Upscale family community with excellent schools.", avgPrice: "$625,000", walkScore: 20, agentId: 1 },
  { name: "Wesley Chapel", slug: "wesley-chapel", description: "New development area with modern amenities.", avgPrice: "$485,000", walkScore: 18, agentId: 1 },
  { name: "Marvin", slug: "marvin", description: "Rural luxury community with estate homes.", avgPrice: "$565,000", walkScore: 15, agentId: 1 },
  
  // West/Northwest Areas
  { name: "Mountain Island Lake", slug: "mountain-island-lake", description: "Lakefront community with boating and recreation.", avgPrice: "$525,000", walkScore: 25, agentId: 1 },
  { name: "Paw Creek", slug: "paw-creek", description: "Rural area with country living near the city.", avgPrice: "$285,000", walkScore: 22, agentId: 1 },
  { name: "Gastonia", slug: "gastonia", description: "Historic mill town with revitalization efforts.", avgPrice: "$245,000", walkScore: 38, agentId: 1 },
  
  // Eastern Suburbs
  { name: "Harrisburg", slug: "harrisburg", description: "Family-oriented suburb with new developments.", avgPrice: "$425,000", walkScore: 25, agentId: 1 },
  { name: "Concord", slug: "concord", description: "Historic city with motorsports heritage.", avgPrice: "$355,000", walkScore: 35, agentId: 1 },
  { name: "Kannapolis", slug: "kannapolis", description: "Former mill town with ongoing revitalization.", avgPrice: "$295,000", walkScore: 42, agentId: 1 },
  { name: "Midland", slug: "midland", description: "Rural community with country atmosphere.", avgPrice: "$465,000", walkScore: 15, agentId: 1 },
  
  // Additional Inner-City Areas
  { name: "Lockwood", slug: "lockwood", description: "Revitalizing neighborhood with community investment.", avgPrice: "$325,000", walkScore: 55, agentId: 1 },
  { name: "Shannon Park", slug: "shannon-park", description: "Affordable neighborhood with community programs.", avgPrice: "$295,000", walkScore: 48, agentId: 1 },
  { name: "Brightwalk", slug: "brightwalk", description: "Emerging neighborhood with development opportunities.", avgPrice: "$285,000", walkScore: 52, agentId: 1 },
  { name: "Druid Hills", slug: "druid-hills", description: "Established neighborhood with mature landscaping.", avgPrice: "$365,000", walkScore: 58, agentId: 1 },
  { name: "Shamrock Gardens", slug: "shamrock-gardens", description: "Family neighborhood with community amenities.", avgPrice: "$325,000", walkScore: 42, agentId: 1 },
  { name: "Sardis Woods", slug: "sardis-woods", description: "Suburban neighborhood with family appeal.", avgPrice: "$485,000", walkScore: 35, agentId: 1 },
  
  // More South Charlotte
  { name: "Carmel", slug: "carmel", description: "Upscale community with luxury amenities.", avgPrice: "$625,000", walkScore: 28, agentId: 1 },
  { name: "Foxcroft", slug: "foxcroft", description: "Golf community with country club lifestyle.", avgPrice: "$545,000", walkScore: 25, agentId: 1 },
  { name: "Beverly Woods", slug: "beverly-woods", description: "Established neighborhood with mature trees.", avgPrice: "$485,000", walkScore: 38, agentId: 1 },
  { name: "Olde Providence", slug: "olde-providence", description: "Golf community with upscale homes.", avgPrice: "$565,000", walkScore: 32, agentId: 1 },
  { name: "Piper Glen", slug: "piper-glen", description: "Master-planned community with amenities.", avgPrice: "$525,000", walkScore: 28, agentId: 1 },
  
  // Additional Areas
  { name: "Commonwealth", slug: "commonwealth", description: "Family neighborhood with parks and schools.", avgPrice: "$385,000", walkScore: 45, agentId: 1 },
  { name: "Hickory Grove", slug: "hickory-grove", description: "Suburban area with family-friendly atmosphere.", avgPrice: "$365,000", walkScore: 38, agentId: 1 },
  { name: "Hidden Valley", slug: "hidden-valley", description: "Family community with recreational amenities.", avgPrice: "$425,000", walkScore: 32, agentId: 1 },
  { name: "Northlake", slug: "northlake", description: "Shopping area with convenient access to amenities.", avgPrice: "$385,000", walkScore: 45, agentId: 1 },
  { name: "Highland Creek", slug: "highland-creek", description: "Golf community with luxury homes.", avgPrice: "$465,000", walkScore: 28, agentId: 1 },
  
  // Final Set
  { name: "Mallard Creek", slug: "mallard-creek", description: "Family neighborhood with community amenities.", avgPrice: "$425,000", walkScore: 35, agentId: 1 },
  { name: "Newell", slug: "newell", description: "Suburban neighborhood with family appeal.", avgPrice: "$365,000", walkScore: 42, agentId: 1 },
  { name: "Reedy Creek", slug: "reedy-creek", description: "Nature community with parks and trails.", avgPrice: "$385,000", walkScore: 25, agentId: 1 },
  { name: "Prosperity Church", slug: "prosperity-church", description: "Family area with excellent schools.", avgPrice: "$445,000", walkScore: 32, agentId: 1 },
  { name: "Derita", slug: "derita", description: "Affordable neighborhood with community character.", avgPrice: "$295,000", walkScore: 38, agentId: 1 },
  { name: "Toringdon", slug: "toringdon", description: "Upscale community with luxury amenities.", avgPrice: "$525,000", walkScore: 35, agentId: 1 },
  { name: "Quail Hollow", slug: "quail-hollow", description: "Golf community known for PGA Championship.", avgPrice: "$485,000", walkScore: 28, agentId: 1 },
  { name: "Whitehall", slug: "whitehall", description: "Family neighborhood with community feel.", avgPrice: "$365,000", walkScore: 35, agentId: 1 },
  { name: "Stallings Ridge", slug: "stallings-ridge", description: "New development with modern homes.", avgPrice: "$425,000", walkScore: 22, agentId: 1 },
  { name: "Fairview", slug: "fairview", description: "Rural luxury community with mountain views.", avgPrice: "$565,000", walkScore: 15, agentId: 1 },
  { name: "Lake Wylie", slug: "lake-wylie", description: "Lake community spanning NC and SC borders.", avgPrice: "$425,000", walkScore: 22, agentId: 1 },
  { name: "Rivergate", slug: "rivergate", description: "Family neighborhood with parks and amenities.", avgPrice: "$385,000", walkScore: 38, agentId: 1 },
  { name: "Southpark Commons", slug: "southpark-commons", description: "Shopping district with urban amenities.", avgPrice: "$525,000", walkScore: 52, agentId: 1 },
  { name: "Stonehaven", slug: "stonehaven", description: "Family community with recreational facilities.", avgPrice: "$465,000", walkScore: 32, agentId: 1 },
  { name: "Arboretum", slug: "arboretum", description: "Upscale shopping area with luxury amenities.", avgPrice: "$545,000", walkScore: 45, agentId: 1 },
  { name: "Raintree", slug: "raintree", description: "Family neighborhood with community amenities.", avgPrice: "$425,000", walkScore: 35, agentId: 1 },
  { name: "Baxter Village", slug: "baxter-village", description: "New Urbanism community with walkable design.", avgPrice: "$385,000", walkScore: 48, agentId: 1 },
  { name: "Governor Hunt", slug: "governor-hunt", description: "Golf community with luxury homes.", avgPrice: "$485,000", walkScore: 25, agentId: 1 },
  { name: "Birkdale Village", slug: "birkdale-village", description: "Mixed-use community with shopping and dining.", avgPrice: "$465,000", walkScore: 58, agentId: 1 }
];

async function addNeighborhoods() {
  try {
    console.log("Adding Charlotte neighborhoods to database...");
    
    for (const neighborhood of charlotteNeighborhoods) {
      try {
        await db.insert(neighborhoods).values({
          name: neighborhood.name,
          slug: neighborhood.slug,
          description: neighborhood.description,
          avgPrice: neighborhood.avgPrice,
          walkScore: neighborhood.walkScore,
          agentId: neighborhood.agentId
        });
        console.log(`Added: ${neighborhood.name}`);
      } catch (error) {
        console.log(`Skipping ${neighborhood.name} (already exists or error)`);
      }
    }
    
    console.log("Finished adding neighborhoods!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding neighborhoods:", error);
    process.exit(1);
  }
}

addNeighborhoods();