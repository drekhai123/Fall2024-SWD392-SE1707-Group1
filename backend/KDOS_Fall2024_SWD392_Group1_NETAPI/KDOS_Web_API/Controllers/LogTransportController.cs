using AutoMapper;
using KDOS_Web_API.Datas;
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
    public class LogTransportController : ControllerBase
    {
        private readonly KDOSDbContext logTransportContext;
        private readonly ILogTransportRepository logTransportRepository;
        private readonly IMapper mapper;

        public LogTransportController(KDOSDbContext logTransportContext, ILogTransportRepository logTransportRepository, IMapper mapper)
        {
            this.logTransportContext = logTransportContext;
            this.logTransportRepository = logTransportRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewLogTransport([FromBody] AddNewLogTransportDTO addNewTransportDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var logTransportModel = mapper.Map<LogTransport>(addNewTransportDTO);
            logTransportModel.Time = DateTime.Now;
            try
            {
                logTransportModel = await logTransportRepository.CreateLogTransportAsync(logTransportModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error" + ex);
            }

            // Map the newly created order back to a DTO for the response
            var newLogTransportDto = mapper.Map<LogTransportDTO>(logTransportModel);

            // Return the created order with a 201 Created status
            return CreatedAtAction(nameof(GetLogTransportById), new { logTransportId = logTransportModel.LogTransportId }, newLogTransportDto);
        }
        [HttpGet]
        [Route("{logTransportId}")]
        public async Task<IActionResult> GetLogTransportById([FromRoute] int logTransportId)
        {
            var logTransportModel = await logTransportRepository.GetLogTransportByIdAsync(logTransportId);
            if (logTransportModel == null)
            {
                return NotFound();
            }
            var logTransportDto = mapper.Map<LogTransportDTO>(logTransportModel); // Map to the appropriate DTO
            return Ok(logTransportDto);
        }

    }
}
