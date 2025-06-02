import { db } from './db';
import { testimonials } from '@shared/schema';

async function addAuthenticTestimonials() {
  // Get Mackenzie's agent ID (assuming she's ID 1)
  const agentId = 1;

  const authenticTestimonials = [
    {
      agentId,
      name: "Bryan Arvelo Bonilla",
      location: "Charlotte, NC",
      content: "From start to finish, Mackenzie made the home buying process feel smooth and stress-free. Her knowledge of the market, attention to detail, and genuine care for her clients set her apart. She always took the time to answer our many questions and made sure we felt confident in every decision we made. If you're looking for someone who is professional, kind, and truly invested in your success, we highly recommend Mackenzie!",
      rating: 5
    },
    {
      agentId,
      name: "Ayokunle Osho",
      location: "Charlotte, NC",
      content: "Working with Mackenzie Siek was fun. We had worked together on a different property last year and it was a success. We were able to duplicate the process this year. She is always professional no matter how many times we broke the ice. She is versatile, knowledgeable and accessible.",
      rating: 5
    },
    {
      agentId,
      name: "Ryan McNally",
      location: "Charlotte, NC",
      content: "Mackenzie for the third year in a row has been one the top realtors that has done business with my inspection team. She has a unique blend of confidence, competence, and charisma about her that I've never seen for someone her age!. After working with mackenzie for many years, I can also confidently say myself that Mackenzie is a loyal partner and friend! You can't go wrong with once you've met her. There are a lot of realtors out there, but very few are truly GREAT like Mackenzie is! It has been wonderful to watch her climb up the ladder of realtors in the charlotte area, and I know she will only continue to grow and flourish!",
      rating: 5
    },
    {
      agentId,
      name: "Keller Beck",
      location: "Charlotte, NC",
      content: "Mackenzie has such great knowledge of the Charlotte area market. She is our go to realtor for any real estate questions or searches. She has fantastic insights and her customer service is unmatched. That girl works 24/7 to get her clients what they need. Highly recommend!",
      rating: 5
    },
    {
      agentId,
      name: "Amber Hellig",
      location: "Charlotte, NC",
      content: "I have worked with Mackenzie Siek both personally and professionally and each were a 10/10 experience. She is super knowledgeable about the market and takes pride in ensuring that you are happy with each purchase/sale!",
      rating: 5
    },
    {
      agentId,
      name: "Taylor Burkhalter",
      location: "Charlotte, NC",
      content: "Mackenzie consistently remains our go to girl when we have any questions about real estate. She's incredibly knowledgeable about the market and goes above and beyond to make sure our questions are answered. Mackenzie gets! 10/10 that I would work with her!",
      rating: 5
    },
    {
      agentId,
      name: "Rosa Valenzuela",
      location: "Charlotte, NC",
      content: "When it comes to real estate, Mackenzie is super knowledgeable, responsive, and really takes the time to understand what you're looking for. She helps you navigate the market, is great at pointing out details, and makes sure you don't miss out on any opportunities. We've always been impressed with her direction and professionalism... she's definitely someone you can trust and feel comfortable asking any questions. I wholeheartedly recommend her, she's the best!",
      rating: 5
    },
    {
      agentId,
      name: "Janelle Lustre",
      location: "Charlotte, NC",
      content: "Mackenzie Siek happens to be one of those professionals who goes ABOVE and beyond for her clients and peers. Her attention to detail is what makes her work top tier compared to other agents. I highly recommend working with her and also for your real estate needs. She knows the field, and she will know what you need....not to mention her humor and positive spirit! Thank you Mackenzie for always checking the marks on all our boxes!!!",
      rating: 5
    },
    {
      agentId,
      name: "Luis Loaiza Garzon",
      location: "Charlotte, NC",
      content: "Mackenzie Siek has excellent communication and a real grasp on the Charlotte market as she is a Charlotte native. Her negotiating skills and strategies to leverage her clients in this volatile market is better than any agent I've worked with. I highly recommend Mackenzie and her team for any real estate endeavors.",
      rating: 5
    },
    {
      agentId,
      name: "Jason Noblitt",
      location: "Charlotte, NC",
      content: "Mackenzie is great to work, her experience and professionalism made working with her a pleasure. I look forward to next next transaction.",
      rating: 5
    },
    {
      agentId,
      name: "Gaylor Eriko",
      location: "Charlotte, NC",
      content: "Mackenzie helped us in selling few investment properties. As an investor, we had high demand and listed above market price. Yet her marketing and great communication skills with the buyers, she was able to sell all that we wanted in short period time. Mackenzie was professional and very easy to work with. I highly recommend Mackenzie to list your home or even buying one.",
      rating: 5
    },
    {
      agentId,
      name: "AJ Talwar",
      location: "Charlotte, NC",
      content: "Mackenzie was professional, knowledgeable, and a pleasure to work with. Her expertise and dedication really stood out, and made the process feel effortless and smooth. Highly recommend!",
      rating: 5
    }
  ];

  try {
    for (const testimonial of authenticTestimonials) {
      await db.insert(testimonials).values(testimonial);
      console.log(`Added testimonial from ${testimonial.clientName}`);
    }
    console.log('All authentic testimonials added successfully!');
  } catch (error) {
    console.error('Error adding testimonials:', error);
  }
}

// Run the script
addAuthenticTestimonials().then(() => {
  console.log('Testimonial import complete');
  process.exit(0);
}).catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
});