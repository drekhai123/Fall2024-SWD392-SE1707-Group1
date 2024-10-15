using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using KDOS_Web_API.Models.DTOs;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiFishController : ControllerBase
    {
        private readonly KDOSDbContext koiFishContext;
        private readonly IKoiFishRepository koiFishRepository;
        private readonly IMapper mapper;

        public KoiFishController(KDOSDbContext koiFishContext, IKoiFishRepository koiFishRepository, IMapper mapper)
        {
            this.koiFishContext = koiFishContext;
            this.koiFishRepository = koiFishRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewKoiFish([FromBody] AddNewKoiFishDTO koifishDto)
        {
            var koiFishModel = mapper.Map<KoiFish>(koifishDto);
            koiFishModel = await koiFishRepository.AddNewKoiFish(koiFishModel);
            var newKoiFish = mapper.Map<KoiFishDTO>(koiFishModel);
            return CreatedAtAction(nameof(GetKoiFishById),new { koiFishId = koiFishModel.KoiFishId}, newKoiFish);
        }
        [HttpDelete]
        [Route("{koiFishId}")]
        public async Task<IActionResult> DeleteKoiFish([FromRoute] int koiFishId)
        {

            var koiFishModel = await koiFishRepository.DeleteKoiFish(koiFishId);
            if (koiFishModel == null)
            {
                return NotFound();
            }
            var koiFishDto = mapper.Map<KoiFishDTO>(koiFishModel);
            return Ok(koiFishDto);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllKoiFish()
        {
            var koiFishModel = await koiFishRepository.GetAllKoiFish();
            var koiFishDto = mapper.Map<List<KoiFishDTO>>(koiFishModel);
            return Ok(koiFishDto);
        }
        
        [HttpGet]
        [Route("{koiFishId}")]
        public async Task<IActionResult> GetKoiFishById([FromRoute] int koiFishId)
        {
            var koiFishModel = await koiFishRepository.GetKoiFishById(koiFishId);
            if (koiFishModel == null)
            {
                return NotFound();
            }
            var koiFishDto = mapper.Map<KoiFishDTO>(koiFishModel);
            return Ok(koiFishDto);
        }
        [HttpPut]
        [Route("{koiFishId}")]
        public async Task<IActionResult> UpdateKoiFish([FromRoute]int koiFishId, [FromBody]AddNewKoiFishDTO addNewKoiFishDTO)
        {
            var koiFishModel = mapper.Map<KoiFish>(addNewKoiFishDTO);
            koiFishModel = await koiFishRepository.UpdateKoiFish(koiFishId,koiFishModel);
            if (koiFishModel == null)
            {
                return NotFound();
            }
            else
            {
                var updatedKoiFish = mapper.Map<KoiFishDTO>(koiFishModel);
                return Ok(updatedKoiFish);
            }
        }
    }
}

