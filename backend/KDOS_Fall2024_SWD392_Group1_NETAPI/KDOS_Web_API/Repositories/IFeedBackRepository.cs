using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IFeedBackRepository
    {
        Task<List<Feedback>> GetAllFeedback();
        Task<Feedback?> GetFeedbackById(int id);
        Task<List<Feedback>> GetFeedbackByCustomerId(int id);
        Task<Feedback?> GetFeedbackByOrderId(int id);
        Task<Feedback?> AddNewFeedBack(Feedback feedback);
        Task<Feedback?> DeleteFeedBack(int id);
        Task<Feedback?> UpdateFeedBack(int id, Feedback feedback);
    }
 
}

