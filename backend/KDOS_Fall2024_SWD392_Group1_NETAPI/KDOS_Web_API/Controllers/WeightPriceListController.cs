using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WeightPriceListController : ControllerBase
    {
        private readonly IWeightPriceListRepository weightPriceListRepository;
        private readonly IMapper mapper;
        private readonly ILogger<WeightPriceListController> logger;
        public WeightPriceListController(IWeightPriceListRepository weightPriceListRepository, IMapper mapper, ILogger<WeightPriceListController> logger)
        {
            this.weightPriceListRepository = weightPriceListRepository;
            this.mapper = mapper;
            this.logger = logger;
        }
        // GET: api/WeightPriceList
        [HttpGet]
        public async Task<IActionResult> GetAllWeightPriceLists()
        {
            var weightPriceLists = await weightPriceListRepository.GetWeightPriceLists();
            var weightPriceListDtos = mapper.Map<List<WeightPriceListDTO>>(weightPriceLists);
            return Ok(weightPriceListDtos);
        }

        // GET: api/WeightPriceList/5
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWeightPriceListById([FromRoute] int id)
        {
            var weightPriceList = await weightPriceListRepository.GetWeightPriceListById(id);
            if (weightPriceList == null)
            {
                return NotFound($"WeightPriceList with ID {id} not found.");
            }
            var weightPriceListDto = mapper.Map<WeightPriceListDTO>(weightPriceList);
            return Ok(weightPriceListDto);
        }

        // POST: api/WeightPriceList
        [HttpPost]
        public async Task<IActionResult> AddNewWeightPriceList([FromBody] AddNewWeightPriceListDTO newWeightPriceListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            var weightPriceListModel = mapper.Map<WeightPriceList>(newWeightPriceListDto);
            try
            {
                weightPriceListModel = await weightPriceListRepository.AddNewWeightPriceList(weightPriceListModel);
                var newWeightPriceListModelDto = mapper.Map<WeightPriceListDTO>(weightPriceListModel);
                return CreatedAtAction(nameof(GetWeightPriceListById), new { id = weightPriceListModel.WeightPriceListId }, newWeightPriceListModelDto);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error adding new Weigh Price List");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/WeightPriceList/5
        [HttpPut]
        [Route("{weightPriceListId}")]
        public async Task<IActionResult> UpdateWeightPriceList([FromRoute] int weightPriceListId, [FromBody] UpdateWeightPriceListDTO updateWeightPriceListDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var weightPriceListModel = await weightPriceListRepository.GetWeightPriceListById(weightPriceListId);
            if (weightPriceListModel == null)
            {
                return NotFound();
            }

            // Update the order model with the new data
            weightPriceListModel = mapper.Map(updateWeightPriceListDTO, weightPriceListModel);
            try
            {
                weightPriceListModel = await weightPriceListRepository.UpdateWeightPriceList(weightPriceListId, weightPriceListModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error" + ex);
            }

            // Map the updated order back to a DTO for the response
            var updatedWeightPriceListDto = mapper.Map<WeightPriceListDTO>(weightPriceListModel);

            // Return the updated order with a 200 OK status
            return Ok(updatedWeightPriceListDto);
        }

        // DELETE: api/WeightPriceList/5
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteWeightPriceListById([FromRoute] int id)
        {
            var deletedWeightPriceList = await weightPriceListRepository.DeleteWeightPriceListById(id);
            if (deletedWeightPriceList == null)
            {
                return NotFound($"WeightPriceList with ID {id} not found.");
            }
            return NoContent(); // 204 No Content
        }
    }
}
