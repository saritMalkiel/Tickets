using Microsoft.AspNetCore.Mvc;
using Tickets.Application.Services;
using Tickets.Core.DTOs;
using Tickets.Core.Enums;
using Tickets.Core.Repositories;


namespace Tickets.Api.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _service;

    public TicketsController(ITicketService service)
    {
        _service = service;
    }

    [HttpPost]
    [ProducesResponseType(typeof(TicketResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TicketResponseDto>> Create([FromBody] CreateTicketDto dto)
    {
        try
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<TicketResponseDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<TicketResponseDto>>> GetAll([FromQuery] TicketStatus? status, [FromQuery] TicketUrgency? urgency)
    {
        var tickets = await _service.GetAllAsync(status, urgency);
        return Ok(tickets);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TicketResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TicketResponseDto>> GetById(int id)
    {
        var ticket = await _service.GetByIdAsync(id);
        if (ticket is null) return NotFound();
        return Ok(ticket);
    }

    [HttpPatch("{id:int}/status")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateTicketStatusDto dto)
    {
        var success = await _service.UpdateStatusAsync(id, dto);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
