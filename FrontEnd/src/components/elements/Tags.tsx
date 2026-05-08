import { FC, Fragment, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import Select from 'react-select';
import { Tagsdata } from '../../common/commondata';
import { TagsInput } from "react-tag-input-component";

interface ComponentProps { }

const Tags: FC<ComponentProps> = () => {

	const [selected, setSelected] = useState([
		"Javascript",
		"ReactJs",
		"AngularJs",
		"VueJs",
		"jQuery",
		"Script",
		"Net",
	]);

	function MultipleselectTags() {
		const [value, setvalue] = useState("");

		const handleOnchange = () => {
			setvalue(value);
		};
		const Optioncategory1 = [
			{
				value: "category-2",
				label: "Firefox",
			},
			{
				value: "category-3",
				label: "Chrome",
			},
			{
				value: "category-4",
				label: "Safari",
			},
			{
				value: "category-5",
				label: "Opera",
			},
			{
				value: "category-6",
				label: "Internet Explorer",
			},
		];
		return (

			<Select onChange={handleOnchange} options={Optioncategory1} className="mt-2" classNamePrefix='Select2' isSearchable placeholder="Firefox" isMulti />
		);
	}

	return (
		<Fragment>
			<Pageheader title="TAGS" heading="Elements" active="TAGS" />

			<Row>
				<Col xl={6} lg={12}>

					<Card>
						<Card.Body>
							<div className="example">
								<div className='d-flex'>
									<div className="main-content-label mg-b-5">
										DEFAULT TAG
									</div>

								</div>
								<p className="mg-b-20">It is Very Easy to Customize and it uses in your website aplication.</p>
								<div className="text-wrap">
									<div className="example">
										<div className="tags">
											<span className="tag">First tag<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link></span>
											<span className="tag">Second tag<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link></span>
											<span className="tag">Third tag<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link></span>
											<span className="tag">Fourth tag<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link></span>
										</div>
									</div>

								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={6} lg={12}>
					<Card>
						<Card.Body>
							<div className="example">
								<div className='d-flex'>
									<div className="main-content-label mg-b-5">
										Link Tag
									</div>
								</div>
								<p className="mg-b-20">It is Very Easy to Customize and it uses in your website aplication.</p>
								<div className="text-wrap">
									<div className="example">
										<div className="tags">
											<span className="tag tag-rounded">First tag<Link to="#" className="tag-addon rounded-pill"><i className="fe fe-x"></i></Link></span>
											<span className="tag tag-rounded">Second tag<Link to="#" className="tag-addon rounded-pill"><i className="fe fe-x"></i></Link></span>
											<span className="tag tag-rounded">Third tag<Link to="#" className="tag-addon rounded-pill"><i className="fe fe-x"></i></Link></span>
											<span className="tag tag-rounded">Fourth tag<Link to="#" className="tag-addon rounded-pill "><i className="fe fe-x"></i></Link></span>
										</div>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={6} lg={12}>
					<Card>
						<Card.Body>
							<div className="example">
								<div className='d-flex'>
									<div className="main-content-label mg-b-5">
										Default Tags Addon
									</div>

								</div>
								<p className="mg-b-20">It is Very Easy to Customize and it uses in your website aplication.</p>
								<div className="text-wrap">
									<div className="example">
										<div className="tags">
											<span className="tag tag-default bg-light">
												One
												<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link>
											</span>
											<span className="tag tag-default  bg-light">
												Two
												<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link>
											</span>
											<span className="tag tag-default  bg-light">
												Three
												<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link>
											</span>
											<span className="tag tag-default  bg-light">
												Four
												<Link to="#" className="tag-addon"><i className="fe fe-x"></i></Link>
											</span>
										</div>
									</div>

								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={6} lg={12}>
					<Card>
						<Card.Body>
							<div className="example">
								<div className='d-flex'>
									<div className="main-content-label mg-b-5">
										Colored tags
									</div>
								</div>
								<p className="mg-b-20">It is Very Easy to Customize and it uses in your website aplication.</p>
								<div className="text-wrap">
									<div className="example">
										<div className="tags">
											{Tagsdata.map((idx) => (
												<span className={`tag tag-${idx.class} br-5`} key={Math.random()}>{idx.class} tag<Link to="#" className={`tag-addon bg-${idx.class}`}><i className="fe fe-x"></i></Link> </span>
											))}
										</div>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col lg={12} xl={12}>
					<Card>
						<Card.Body>
							<div className="example">
								<div className="main-content-label mg-b-5">
									Multiple select Tags
								</div>
								<p className="mg-b-10">Multiple Select</p>
								<MultipleselectTags />
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col lg={12} xl={12}>
					<Card>
						<Card.Body>
							<div className="example">
								<div className='d-flex'>
									<div className="main-content-label mg-b-5">
										Input Tags
									</div>

								</div>
								<p className="mg-b-20">It is Very Easy to Customize and it uses in your website aplication.</p>
								<div className="text-wrap">
									<div className="">
										<div className='form-group'>
											<div className='bootstrap-tagsinput'>
												<TagsInput value={selected} onChange={setSelected} name="courses" />
											</div>
										</div>
									</div>
								</div></div>
						</Card.Body>
					</Card>
				</Col>

			</Row>
		</Fragment>
	);
};

export default Tags;