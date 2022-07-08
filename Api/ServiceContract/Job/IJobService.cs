using Core.Models;
using System.Threading.Tasks;

namespace ServiceContract.Job;

public interface IJobService
{
    Task Edit(JobCreateModel model, int id);
    Task<JobModel> CreateJob(JobCreateModel model, string userId);
    Task Resolve(int id, string userId);
    Task<List<JobModel>?> GetJobs(string userId);
}