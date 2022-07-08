import { Component } from "react";

class JobItem extends Component {

    render()
    {
        return (
            <div className="item-row">
					<label className="check-flag">
						<span className="check-flag-label">Pick up drycleaning</span>
						<span className="checkbox">
							<input className="checkbox-native" type="checkbox" />
							<span className="checkmark">
								<svg viewBox="0 0 24 24">
									<path className="checkmark-icon" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
								</svg>
							</span>
						</span>
					</label>
				</div>
        );
    }
}

export default JobItem;