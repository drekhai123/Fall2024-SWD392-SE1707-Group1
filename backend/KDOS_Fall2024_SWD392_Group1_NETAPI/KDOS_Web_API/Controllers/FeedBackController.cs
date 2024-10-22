using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly IFeedBackRepository feedBackRepository;
        private readonly IMapper mapper;

        public FeedBackController(IFeedBackRepository feedBackRepository,IMapper mapper)
        {
            this.feedBackRepository = feedBackRepository;
            this.mapper = mapper;
        }
        //public async Task<Feedback?> AddNewFeedBack(Feedback feedback)
        //{
        //    var customerModel = await feedbackContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == feedback.CustomerId);
        //    var orderModel = await feedbackContext.Orders.FirstOrDefaultAsync(x => x.OrderId == feedback.OrderId);
        //    if (customerModel == null || orderModel == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        await feedbackContext.Feedback.AddAsync(feedback);
        //        await feedbackContext.SaveChangesAsync();
        //        return feedback;
        //    }
        //}
        [HttpDelete]
        [Route("{feedbackId}")]
        public async Task<IActionResult> DeleteFeedBack([FromRoute]int feedbackId)
        {
            var feedbackModel = await feedBackRepository.DeleteFeedBack(feedbackId);
            if (feedbackModel == null)
            {
                return NotFound();
            }
            var feedbackDto = mapper.Map<FeedbackDTO>(feedbackModel);
            return Ok(feedbackDto);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            var feedbackModel = await feedBackRepository.GetAllFeedback();
            var feedbackDto = mapper.Map<List<FeedbackDTO>>(feedbackModel);
            return Ok(feedbackDto);
        }
        [HttpGet]
        [Route("customer/{customerId}")]
        public async Task<IActionResult> GetFeedbackByCustomerId([FromRoute]int customerId)
        {
            var feedbackModel = await feedBackRepository.GetFeedbackByCustomerId(customerId);
            var feedbackDto = mapper.Map<List<FeedbackDTO>>(feedbackModel);
            return Ok(feedbackDto);
        }
        [HttpGet]
        [Route("{feedbackId}")]
        public async Task<IActionResult> GetFeedbackById([FromRoute]int feedbackId)
        {
            var feedbackModel = await feedBackRepository.GetFeedbackById(feedbackId);
            var feedbackDto = mapper.Map<FeedbackDTO>(feedbackModel);
            return Ok(feedbackDto);
        }
        [HttpGet]
        [Route("order/{orderId}")]
        public async Task<IActionResult> GetFeedbackByOrderId([FromRoute]int orderId)
        {
            var feedbackModel = await feedBackRepository.GetFeedbackByOrderId(orderId);
            var feedbackDto = mapper.Map<FeedbackDTO>(feedbackModel);
            return Ok(feedbackDto);
        }
        //[HttpPut]
        //[Route("{feedbackId}")]
        //public async Task<IActionResult> UpdateFeedBack(int id, UpdateFeedBackDTO feedback)
        //{
        //    var feedbackModel = mapper.Map<Feedback>(feedback);
        //    feedbackModel = await feedBackRepository.UpdateFeedBack(id, feedbackModel);
        //    if (feedbackModel == null)
        //    {
        //        return NotFound();
        //    }
        //    else
        //    {
        //        feedbackModel.Comment = feedback.Comment;
        //        feedbackModel.Rating = feedback.Rating;
        //        feedbackModel.UpdatedAt = feedback.UpdatedAt;
        //        await feedbackContext.SaveChangesAsync();
        //        return feedbackModel;
        //    }
        //}
    }
}

