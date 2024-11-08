using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Models.Enum;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TransportController : ControllerBase
{
    private readonly ITransportRepository transportRepository;
    private readonly IMapper mapper;
    private readonly ILogger<TransportController> logger;

    public TransportController(ITransportRepository transportRepository, IMapper mapper, ILogger<TransportController> logger)
    {
        this.transportRepository = transportRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTransports()
    {
        var transportsList = await transportRepository.GetAllTransport();
        // Auto mapper
        var transportDTOs = mapper.Map<List<TransportDTO>>(transportsList);
        // Following Best Practice
        return Ok(transportDTOs);
    }
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetTransportById([FromRoute]int id)
    {
        try
        {
            var transportModel = await transportRepository.GetTransportById(id);
            if (transportModel == null)
            {
                return NotFound("Transport ID not existed !!!");
            }

            var transportDto = mapper.Map<TransportDTO>(transportModel);
            return Ok(transportDto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving transport with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpGet]
    [Route("Active/{id}")]
    public async Task<IActionResult> GetActiveTransportById([FromRoute] int id)
    {
        try
        {
            var transportModel = await transportRepository.GetActiveTransportByOrderStatus(id);
            if (transportModel == null)
            {
                return NotFound("Transport not Found!!!");
            }

            var transportDto = mapper.Map<TransportDTO>(transportModel);
            return Ok(transportDto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving transport with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpGet]
    [Route("DeliveryStaff/{id}")]
    public async Task<IActionResult> GetByDeliveryStaff([FromRoute] int id)
    {
        try
        {
            var transportModel = await transportRepository.GetByDeliveryStaff(id);
            if (transportModel == null)
            {
                return NotFound("Transport not existed !!!");
            }

            var transportDto = mapper.Map<TransportDTO>(transportModel);
            return Ok(transportDto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving transport with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddNewTransport([FromBody] AddNewTransportDTO addNewTransportDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var transportModel = mapper.Map<Transport>(addNewTransportDTO);
        transportModel.Status = TransportStatus.FREE;

        try
        {
            transportModel = await transportRepository.AddNewTransport(transportModel);
            if (transportModel == null)
            {
                return NotFound("Something is wrong when adding Transport");
            }
            var newTransportDto = mapper.Map<TransportDTO>(transportModel);
            return CreatedAtAction(nameof(GetTransportById), new { id = transportModel.TransportId }, newTransportDto);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding new transport");
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpPut]
    [Route("{transportId}")]
    public async Task<IActionResult> UpdateOrder([FromRoute] int transportId, [FromBody] UpdateTransportDTO updateTransportDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var transportModel = await transportRepository.GetTransportById(transportId);
        if (transportModel == null)
        {
            return NotFound();
        }

        // Update the order model with the new data
        transportModel = mapper.Map(updateTransportDTO, transportModel);

        try
        {
            transportModel = await transportRepository.UpdateTransport(transportId, transportModel);
            if (transportModel == null)
            {
                return NotFound("Staffs Cannot Be Assigned!");
            }
        }
        catch (Exception ex)
        {
            // Log the exception
            return StatusCode(500, "Internal server error" + ex);
        }

        // Map the updated order back to a DTO for the response
        var updatedTransportDto = mapper.Map<TransportDTO>(transportModel);

        // Return the updated order with a 200 OK status
        return Ok(updatedTransportDto);
    }

    [HttpDelete]
    [Route("{transportId}")]
    public async Task<IActionResult> DeleteTransport([FromRoute] int transportId)
    {
        var transportModel = await transportRepository.DeleteTransport(transportId);
        if (transportModel == null)
        {
            return NotFound("Cannot find the transport ID");
        }
        var orderDto = mapper.Map<TransportDTO>(transportModel);
        return Ok(orderDto);
    }







}