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
        [HttpGet]
        public async Task<IActionResult> GetAllLogTransport()
        {
            var logTransportModel = await logTransportRepository.GetAllLogTransportsAsync();
            var logTransportDto = mapper.Map<List<LogTransportDTO>>(logTransportModel); // Map to the appropriate DTO
            return Ok(logTransportDto);
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
        [HttpGet]
        [Route("customer/{customerId}")]
        public async Task<IActionResult> GetLogTransportByCustomerId([FromRoute] int customerId)
        {
            var logTransportModel = await logTransportRepository.GetLogTransportByIdAsync(customerId);
            if (logTransportModel == null)
            {
                return NotFound();
            }
            var logTransportDto = mapper.Map<LogTransportDTO>(logTransportModel); // Map to the appropriate DTO
            return Ok(logTransportDto);
        }
        [HttpGet]
        [Route("transport/{transportId}")]
        public async Task<IActionResult> GetLogTransportByTransportId([FromRoute] int transportId)
        {
            try
            {
                var logTransportModels = await logTransportRepository.GetTransportLogByTransportId(transportId);

                if (logTransportModels == null || !logTransportModels.Any())
                {
                    return NotFound();
                }

                var logTransportDtos = mapper.Map<List<LogTransportDTO>>(logTransportModels);
                return Ok(logTransportDtos);
            }
            catch (Exception ex)
            {
                // Log the exception (using a logging framework)
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
