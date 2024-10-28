using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishProfileController : ControllerBase
    {
        private readonly IFishProfileRepository fishProfileRepository;
        private readonly IMapper mapper;

        public FishProfileController(IFishProfileRepository fishProfileRepository,IMapper mapper)
        {
            this.fishProfileRepository = fishProfileRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProfile()
        {
            var profileList = await fishProfileRepository.GetAllProfile();
            var profileDto = mapper.Map<List<FishProfileDTO>>(profileList);
            return Ok(profileDto);
        }
        [HttpPost] // Post for create - FromBody is the data send from Client in the Respone Body
        public async Task<IActionResult> AddNewFishProfile([FromBody] AddNewFishProfileDTO addNewFishProfileDTO)
        {
            // using the DTO to convert Model
            var profileModel = mapper.Map<FishProfile>(addNewFishProfileDTO);
             profileModel = await fishProfileRepository.AddNewFishProfile(profileModel);
            if (profileModel == null)
            {
                return NotFound();
            }
            //Map Model back to DTO
            //Get Customer Account info
            
                var profileDto = mapper.Map<FishProfileDTO>(profileModel);
                // Follow best practice
                return CreatedAtAction(nameof(GetProfileById), new { fishProfileId = profileModel.FishProfileId }, profileDto); // Respone with code 201 - Created Complete                                                                                                                       //CreatedAtAction will trigger the action GetProfileById to search for the created Fish in the db using the id generate by the EF. Then convert the data to a DTO and respone that bakc to client. So we can know what data created 
        }
        [HttpGet]
        [Route("{fishProfileId}")]
        public async Task<IActionResult> GetProfileById([FromRoute]int fishProfileId)
        {
            var profileModel = await fishProfileRepository.GetProfileById(fishProfileId);
            if (profileModel == null)
            {
                return NotFound();
            }
            var profileDto = mapper.Map<FishProfileDTO>(profileModel);
            return Ok(profileDto);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateFishProfile([FromRoute]int id, [FromBody]UpdateFishProfileDTO updateFishProfileDTO)
        {
            var profileModel = mapper.Map<FishProfile>(updateFishProfileDTO);
            profileModel = await fishProfileRepository.UpdateFishProfile(id, profileModel);
            if (profileModel == null)
            {
                return NotFound();
            }
            var profileDto = mapper.Map<FishProfileDTO>(profileModel);
            return Ok(profileDto);
        }
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProfile([FromRoute]int id)
        {
            var profileModel = await fishProfileRepository.DeleteProfile(id);
            if (profileModel == null)
            {
                return NotFound();
            }
            var profileDto = mapper.Map<FishProfileDTO>(profileModel);
            return Ok(profileDto);
        }
        
        [HttpGet]
        [Route("Customer/{id}")]
        public async Task<IActionResult> GetProfileByCustomerId([FromRoute]int id)
        {
            var profileList = await fishProfileRepository.GetProfileByCustomerId(id);
            var profileDto = mapper.Map<List<FishProfileDTO>>(profileList);
            return Ok(profileDto);
        }

        // GET: api/fishprofile/search?name=salmon
        [HttpGet("{customerId}/search")]
        public async Task<IActionResult> SearchFishProfileByName([FromRoute] int customerId, [FromQuery] string name)
        {
            var fishProfiles = await fishProfileRepository.SearchFishProfileByName(customerId, name);

            if (fishProfiles == null || fishProfiles.Count == 0)
            {
                return NotFound("No fish profiles found.");
            }
            var fishProfileDto = mapper.Map<List<FishProfileDTO>>(fishProfiles);
            return Ok(fishProfileDto);
        }

    }
}

