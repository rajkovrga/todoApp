using System.Security.Claims;
using AppContext;
using Core.Exceptions;
using Core.Models;
using EntityContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiceContract.Job;

namespace Service.Job;
public class JobService : IJobService
{
    private readonly DataContext _dbContext;
    private readonly UserManager<AppUser> _userManager;

    public JobService(DataContext dbContext, UserManager<AppUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    public async Task Edit(JobCreateModel model, int id)
    {
        var task = await _dbContext.Jobs.FindAsync(id);

        if (task is null)
        {
            throw new ModelNotFoundException();
        }

        task.Description = model.Description;
        task.Title = model.Title;
        await _dbContext.SaveChangesAsync();
    }

    public async Task<JobModel> CreateJob(JobCreateModel model, string userId)
    {
        if (model is null)
        {
            throw new ModelNotFoundException();
        }

        var user = await _dbContext.Users.FirstAsync(x => x.Id == userId);

        var job = new EntityContext.Job
        {
            Description = model.Description,
            Title = model.Title,
            AppUser = user
        };

        await _dbContext.Jobs.AddAsync(job);
        
        await _dbContext.SaveChangesAsync();

        var newJob = _dbContext.Jobs.First(x => x.Title == job.Title && x.AppUser.Id == userId);
        
        return new JobModel()
        {
            Id = newJob.Id,
            Title = newJob.Title,
            Description = newJob.Description,
            User = user,
            CreatedAt = newJob.CreatedAt
        };
    }

    public async Task Resolve(int id, string userId)
    {
        var task = await _dbContext.Jobs.FirstOrDefaultAsync(x => x.Id == id && x.AppUser.Id == userId);
        
        if (task is null)
        {
            throw new ModelNotFoundException();
        }
        task.DeletedAt = DateTime.Now;
        
        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<JobModel>?> GetJobs(string userId)
    {
        var jobs = await _dbContext.Jobs.Include(x => x.AppUser).Where(x => x.AppUser.Id == userId && x.DeletedAt == null).ToListAsync();

        return jobs?.Select(x => new JobModel()
        {
            Id = x.Id,
            Description = x.Description,
            Title = x.Title,
            User = x.AppUser,
            CreatedAt = x.CreatedAt
        }).ToList();
    }
}