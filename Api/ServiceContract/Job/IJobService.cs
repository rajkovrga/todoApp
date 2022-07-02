using Core.Models;
using System.Threading.Tasks;

namespace ServiceContract.Job;

public interface IJobService
{
    Task Edit(JobModel model, int id);
    Task<JobModel> CreateJob(JobModel model, string userId);
    Task Resolve(int id, string userId);
    Task<List<JobModel>?> GetJobs(string userId);
}