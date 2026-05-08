import { FC, Fragment, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Dropdown from "react-dropdown-select";
import { connect } from 'react-redux';
import { DefaultData, GroupData, OptionData, Preference } from '../../../common/selectdata';
import Select from 'react-select';
import Pageheader from '../../../layout/layoutcomponent/pageheader';

interface FormSelectProps {
  local_varaiable: any;
}


const Formselect: FC<FormSelectProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="FORM SELECT" heading="Form Elements" active="FORM SELECT" />

      <h6 className="fw-semibold mb-2">React Select:</h6>

      <Row className="row-sm">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className='justify-content-between pb-0'>
              <div className='card-title'> Multiple Select </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className='pt-0'>
              <p className="fw-semibold my-2">Default</p>
              <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" keepSelectedInList={false} searchable={false} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />

              <p className="fw-semibold my-2">With a dropdown handle</p>
              <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" searchable={false} multi={true} dropdownHandle={true} onChange={(values) => { console.log('Selected values:', values); }} />

              <p className="fw-semibold my-2">Multiple Group with Search option</p>
              <Dropdown options={GroupData.flatMap((group) => (group.disabled ? [] : group.options))} keepSelectedInList={false} multi={true} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />

            </Card.Body>
            <div className={`${isHidden[0] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <p className="fw-semibold my-2">Default</p>
        <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" keepSelectedInList={false} searchable={false} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />

        <p className="fw-semibold my-2">With a dropdown handle</p>
        <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" searchable={false} multi={true} dropdownHandle={true} onChange={(values) => { console.log('Selected values:', values); }} />

        <p className="fw-semibold my-2">Multiple Group with Search option</p>
        <Dropdown options={GroupData.flatMap((group) => (group.disabled ? [] : group.options))} keepSelectedInList={false} multi={true} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className='justify-content-between'>
              <div className='card-title'> Passing Through Options </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <Dropdown options={[]} values={[]} create={true} placeholder="Choice 1" searchable={true} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
            </Card.Body>
            <div className={`${isHidden[1] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Dropdown options={[]} values={[]} create={true} placeholder="Choice 1" searchable={true} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className='justify-content-between'>
              <div className='card-title'> Options added via config with search and Cleared option</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <Dropdown options={DefaultData} values={[]} create={true} keepSelectedInList={true} placeholder="Choice 1" clearable={true} searchable={true} dropdownHandle={true} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
            </Card.Body>
            <div className={`${isHidden[2] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Dropdown options={DefaultData} values={[]} create={true} keepSelectedInList={true} placeholder="Choice 1" clearable={true} searchable={true} dropdownHandle={true} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
      </Row>


      <Row className="row-sm">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className=" justify-content-between">
              <div className='card-title'>Single Select</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''} pt-0`}>
              <p className="fw-semibold my-2">Default</p>
              <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" searchable={false} dropdownHandle={false} multi={false} onChange={(values) => { console.log('Selected values:', values); }} />

              <p className="fw-semibold my-2">Multiple group option with single Select and Search option</p>
              <Dropdown options={GroupData.flatMap((group) => (group.disabled ? [] : group.options))} multi={false} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />
            </Card.Body>
            <div className={`${isHidden[3] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <p className="fw-semibold my-2">Default</p>
        <Dropdown options={DefaultData} values={[]} placeholder="Choice 1" searchable={false} dropdownHandle={false} multi={false} onChange={(values) => { console.log('Selected values:', values); }} />

        <p className="fw-semibold my-2">Multiple group option with single Select and Search option</p>
        <Dropdown options={GroupData.flatMap((group) => (group.disabled ? [] : group.options))} multi={false} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className='justify-content-between'>
              <div className='card-title'> Disabled Select </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
              <Dropdown options={DefaultData} disabled values={[]} keepSelectedInList={false} placeholder="Disabled Select" searchable={false} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
            </Card.Body>
            <div className={`${isHidden[4] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Dropdown options={DefaultData} disabled values={[]} keepSelectedInList={false} placeholder="Disabled Select" searchable={false} dropdownHandle={false} multi={true} onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className='justify-content-between'>
              <div className='card-title'> Passing Unique Values </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <Dropdown options={OptionData} create={true} multi={false} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />
            </Card.Body>
            <div className={`${isHidden[5] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Dropdown options={OptionData} create={true} multi={false} values={[]} placeholder="Chooes the City" onChange={(values) => { console.log('Selected values:', values); }} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
      </Row>



      <Row className="row-sm">
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'> Default Select </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <Select options={Preference} placeholder="Open this select menu" aria-label="Default select example" classNamePrefix="Select2" className='search-panel' />
            </Card.Body>
            <div className={`${isHidden[6] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Select options={Preference} placeholder="Open this select menu" aria-label="Default select example" classNamePrefix="Select2" className='search-panel' />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'>
                Disabled Select
              </div>

              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <Select options={Preference} placeholder="Open this select menu" aria-label="Disabled select example" classNamePrefix="Select2" className='search-panel' isDisabled={true} />
            </Card.Body>
            <div className={`${isHidden[7] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Select options={Preference} placeholder="Open this select menu" aria-label="Disabled select example" classNamePrefix="Select2" className='search-panel' isDisabled={true} />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'>
                Rounded Select
              </div>

              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
              <Select options={Preference} placeholder="Open this select menu" aria-label="Default select example" classNamePrefix="Select2" className='rounded-pill search-panel' />
            </Card.Body>
            <div className={`${isHidden[8] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <Select options={Preference} placeholder="Open this select menu" aria-label="Default select example" classNamePrefix="Select2" className='rounded-pill search-panel' />
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'>
                Multiple Attribute Select
              </div>

              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
              <select className="form-select" aria-label="multiple select example" multiple>
                <option selected>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            </Card.Body>
            <div className={`${isHidden[9] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <select className="form-select" aria-label="multiple select example">
        <option>Open this select menu</option>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </select>
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'>
                Using Size Attribute
              </div>

              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[10] ? 'd-none' : ''}`}>
              <select className="form-select" size={4} aria-label="size 3 select example">
                <option selected>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
                <option>Four</option>
                <option>Five</option>
              </select>
            </Card.Body>
            <div className={`${isHidden[10] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <select className="form-select" size={4} aria-label="size 3 select example">
        <option>Open this select menu</option>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
        <option>Four</option>
        <option>Five</option>
      </select>
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className='card-title'>
                Select Sizes
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[11] ? 'd-none' : ''}`}>
              <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                <option >Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
              <select className="form-select mb-3" aria-label="Default select">
                <option>Open this select menu
                </option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
              <select className="form-select form-select-lg" aria-label=".form-select-lg example">
                <option >Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            </Card.Body>
            <div className={`${isHidden[11] ? '' : 'd-none'} card-footer border-top-0`}>
              {/* <!-- Prism Code --> */}

              <pre><code className='language-javascript'>
                {`
        <Card.Body>
        <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
        <option >Open this select menu</option>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </select>
      <select className="form-select mb-3" aria-label="Default select">
        <option>Open this select menu
        </option>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </select>
      <select className="form-select form-select-lg" aria-label=".form-select-lg example">
        <option >Open this select menu</option>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </select>
        </Card.Body>
                `}
              </code></pre>

              {/* <!-- Prism Code --> */}
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state
})

export default connect(mapStateToProps, {})(Formselect);