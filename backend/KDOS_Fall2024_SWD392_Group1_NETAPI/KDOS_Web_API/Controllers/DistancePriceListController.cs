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
    public class DistancePriceListController : ControllerBase
    {
        private readonly IDistancePriceListRepository distancePriceListRepository;
        private readonly IMapper mapper;
        private readonly ILogger<DistancePriceListController> logger;
        public DistancePriceListController(IDistancePriceListRepository distancePriceListRepository, IMapper mapper, ILogger<DistancePriceListController> logger)
        {
            this.distancePriceListRepository = distancePriceListRepository;
            this.mapper = mapper;
            this.logger = logger;
        }
        // GET: api/distancePriceList
        [HttpGet]
        public async Task<IActionResult> GetAllDistancePriceLists()
        {
            var distancePriceLists = await distancePriceListRepository.GetDistancePriceList();
            var distancePriceListDtos = mapper.Map<List<DistancePriceListDTO>>(distancePriceLists);
            return Ok(distancePriceListDtos);
        }

        // GET: api/distancePriceList/5
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetDistancePriceListById([FromRoute] int id)
        {
            var distancePriceList = await distancePriceListRepository.GetDistancePriceListById(id);
            if (distancePriceList == null)
            {
                return NotFound($"DistancePriceList with ID {id} not found.");
            }
            var distancePriceListDto = mapper.Map<DistancePriceListDTO>(distancePriceList);
            return Ok(distancePriceListDto);
        }

        // POST: api/distancePriceList
        [HttpPost]
        public async Task<IActionResult> AddNewDistancePriceList([FromBody] AddNewDistancePriceListDTO newdistancePriceListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var distancePriceListModel = mapper.Map<DistancePriceList>(newdistancePriceListDto);
            try
            {
                distancePriceListModel = await distancePriceListRepository.AddNewDistancePriceList(distancePriceListModel);
                var newDistancePriceListModelDto = mapper.Map<DistancePriceListDTO>(distancePriceListModel);
                return CreatedAtAction(nameof(GetDistancePriceListById), new { id = distancePriceListModel.DistancePriceListId }, newDistancePriceListModelDto);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error adding new Distance Price List");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/distancePriceList/5
        [HttpPut]
        [Route("{distancePriceListId}")]
        public async Task<IActionResult> UpdateDistancePriceList([FromRoute] int distancePriceListId, [FromBody] UpdateDistancePriceListDTO updateDistancePriceListDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var distancePriceListModel = await distancePriceListRepository.GetDistancePriceListById(distancePriceListId);
            if (distancePriceListModel == null)
            {
                return NotFound();
            }

            // Update the order model with the new data
            distancePriceListModel = mapper.Map(updateDistancePriceListDTO, distancePriceListModel);
            try
            {
                distancePriceListModel = await distancePriceListRepository.UpdateDistancetPriceList(distancePriceListId, distancePriceListModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error" + ex);
            }

            // Map the updated order back to a DTO for the response
            var updateDistancePriceListDto = mapper.Map<DistancePriceListDTO>(distancePriceListModel);

            // Return the updated order with a 200 OK status
            return Ok(updateDistancePriceListDto);
        }

        // DELETE: api/distancePriceList/5
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteDistancePriceListById([FromRoute] int id)
        {
            var deleteDistancePriceList = await distancePriceListRepository.DeleteDistancePriceListById(id);
            if (deleteDistancePriceList == null)
            {
                return NotFound($"distancePriceList with ID {id} not found.");
            }
            return NoContent(); // 204 No Content
        }
    }
}
