import { useContext } from "react";
import { DateJobContext } from "../../../context/DateJobProvider";
import { JobReturnModel } from "../../../models";
import { resolveJob } from "../../../services/jobs.service";
import { EditJobModal } from "./EditJobModal";

type Props = {
	data: JobReturnModel;
};

const JobItem = ({ data }: Props) => {
	const contextDate = useContext(DateJobContext);

	const resolve = async () => {
		try {
			await resolveJob(data.id);
			alert('Resolved');
			contextDate.resolve(data.id);
		}
		catch (err: any) {
			alert('Application error');
		}
	}


	return (
		<div className="item-row">
				<div>
					<span className="check-flag-label">{data.title}</span>
					{data.description !== '' &&
						<p>{data.description}</p>
					}
				</div>
				<div className="d-flex">
					<EditJobModal data={data} key={data.id} />
					<label className="check-flag">

					<div className="form-check">
						<input onClick={resolve} className="form-check-input" type="checkbox" id="flexCheckDefault" />
					</div>
					</label>
				</div>
		</div>
	);
}

export default JobItem;