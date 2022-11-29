using System.Security.Claims;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContract.Job;

namespace Api.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
[Authorize(Policy = "BasicActions")]
public class JobController : Controller
{
    private readonly IJobService _jobService;

    public JobController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] JobCreateModel model, int id)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");

        await _jobService.Edit(model, id);
        return NoContent();
    }
    
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] JobCreateModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var newJob = await _jobService.CreateJob(model, id);
        return StatusCode(StatusCodes.Status201Created, newJob);    
    }
    
    [HttpPut]
    public async Task<IActionResult> Resolve(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        await _jobService.Resolve(id, userId);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var jobs = await _jobService.GetJobs(id);
        return Ok(jobs);
    }
}