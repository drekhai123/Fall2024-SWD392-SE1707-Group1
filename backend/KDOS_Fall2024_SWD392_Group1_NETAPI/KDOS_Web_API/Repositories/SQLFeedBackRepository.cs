using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLFeedBackRepository : IFeedBackRepository
	{
        private readonly KDOSDbContext feedbackContext;

        public SQLFeedBackRepository(KDOSDbContext feedbackContext)
		{
            this.feedbackContext = feedbackContext;
        }

        public async Task<Feedback?> AddNewFeedBack(Feedback feedback)
        {
            var customerModel = await feedbackContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == feedback.CustomerId);
            var orderModel = await feedbackContext.Orders.FirstOrDefaultAsync(x => x.OrderId == feedback.OrderId);
            if(customerModel ==null || orderModel == null)
            {
                return null;
            }
            else
            {
                await feedbackContext.Feedback.AddAsync(feedback);
                await feedbackContext.SaveChangesAsync();
                return feedback;
            }
        }

        public async Task<Feedback?> DeleteFeedBack(int id)
        {
            var feedbackModel = await feedbackContext.Feedback.FirstOrDefaultAsync(x => x.FeedbackId == id);
            if (feedbackModel == null)
            {
                return null;
            }
            feedbackContext.Feedback.Remove(feedbackModel);
            await feedbackContext.SaveChangesAsync();
            return feedbackModel;
        }

        public async Task<List<Feedback>> GetAllFeedback()
        {
            return await feedbackContext.Feedback.ToListAsync();
        }

        public async Task<List<Feedback>> GetFeedbackByCustomerId(int id)
        {
            var feedbackModel = await feedbackContext.Feedback.Where(x => x.CustomerId == id).ToListAsync();
            return feedbackModel;
        }

        public async Task<Feedback?> GetFeedbackById(int id)
        {
            var feedbackModel = await feedbackContext.Feedback.Include(x=>x.Customer).FirstOrDefaultAsync(x => x.FeedbackId == id);
            return feedbackModel;
        }

        public async Task<Feedback?> GetFeedbackByOrderId(int id)
        {
            var feedbackModel = await feedbackContext.Feedback.Include(x => x.Customer).FirstOrDefaultAsync(x => x.OrderId == id);
            return feedbackModel;
        }

        public async Task<Feedback?> UpdateFeedBack(int id, Feedback feedback)
        {
            var feedbackModel = await feedbackContext.Feedback.Include(x => x.Customer).FirstOrDefaultAsync(x => x.FeedbackId == id);
            if (feedbackModel==null)
            {
                return null;
            }
            else
            {
                feedbackModel.Comment = feedback.Comment;
                feedbackModel.Rating = feedback.Rating;
                feedbackModel.UpdatedAt = feedback.UpdatedAt;
                await feedbackContext.SaveChangesAsync();
                return feedbackModel;
            }
        }
    }
}

