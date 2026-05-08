

import { FC, Fragment, useState } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Button, Dropdown, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userData } from '../../common/commondata';

interface ComponentProps { }

const Userlist: FC<ComponentProps> = () => {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<Fragment>
			<Pageheader title="USERLIST" heading="Advanced UI" active="Userlist" />

			<div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
				<div>
					<Link className="btn ripple btn-primary" onClick={handleShow} to="#!"><i className="fe fe-plus me-2"></i>Add New User</Link>
				</div>
				<div className="btn-list">
					<button id="userlist-1" className="btn btn-primary  me-2">Delete User</button>
					<button type="button" className="btn btn-secondary">
						<i className="fe fe-download me-1"></i> Download User Data
					</button>
				</div>
			</div>
			<div className="row row-sm">
				<div className="col-lg-12">
					<div className="card custom-card">
						<div className="card-body">
							<div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
								<Dropdown>
									<Dropdown.Toggle variant="" as='a' className="no-caret btn btn-primary btn-sm btn-wave waves-effect waves-light" id="dropdown-basic">
										Sort By<i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item href="#/action-1">New</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Popular</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Relevant</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<div>
									<input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
								</div>
							</div>
							<div className="table-responsive  deleted-table">
								<table id="user-datatable" className="table table-bordered text-nowrap border-bottom Userlist">
									<thead>
										<tr>
											<th className="wd-2">Photo</th>
											<th>Name</th>
											<th>Role</th>
											<th>Last Active</th>
											<th>Country</th>
											<th>Verification</th>
											<th>Joined Date</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{userData.map(user => (
											<tr key={user.id}>
												<td>
													{user.id == 2 || user.id == 3 || user.id == 7 || user.id == 9 ? (
														<div className={`avatar avatar-md bg-${user.avatarvariant} text-fixed-white rounded-circle`}>
															{user.avatar}
														</div>
													) : (
														<div className="avatar avatar-md  rounded-circle">
															<img alt="avatar" className="rounded-circle" src={user.avatar} />
														</div>
													)}

												</td>
												<td>
													<p className="tx-14 fw-semibold text-dark mb-1">{user.name}</p>
													<p className="tx-13 text-muted mb-0">{user.email}</p>
												</td>
												<td>
													<span className="text-muted tx-13">{user.role}</span>
												</td>
												<td>
													<span className="badge bg-light text-muted tx-13">{user.lastActive}</span>
												</td>
												<td>
													<span className="text-muted tx-13">{user.country}</span>
												</td>
												<td>
													<span className={`badge fw-semibold ${user.verificationStatus === 'Verified' ? 'bg-success-transparent text-success' : 'bg-secondary-transparent text-secondary'} tx-11`}>{user.verificationStatus}</span>
												</td>
												<td>
													<span className="text-muted tx-13">{user.joinedDate}</span>
												</td>
												<td>
													<OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}><Link to="#" className="btn btn-icon btn-primary-light me-2"><i className="las la-pen"></i></Link></OverlayTrigger>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>


			<Modal show={show} onHide={handleClose} centered animation={true}>
				<Modal.Header closeButton>
					<Modal.Title as='h6'>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="">
						<form className="form-horizontal">
							<div className="form-group">
								<input type="text" className="form-control" id="inputName" placeholder="Name" />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" id="inputName1" placeholder="Role" />
							</div>
							<div className="form-group">
								<input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
							</div>
							<div className="form-group mb-0 justify-content-end">
								<div className="form-check"> <input className="form-check-input mt-2" type="checkbox" value="" id="flexCheckChecked1" /> <label className="custom-control-label mt-1 text-dark ms-1">New User?</label></div>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" className='ripple'>
						Add
					</Button>
					<Button variant="secondary" className='ripple' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>


		</Fragment>
	);
};

export default Userlist;
