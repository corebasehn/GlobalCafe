import { FC, Fragment } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { SimpleTreeView } from "@mui/x-tree-view";
// icons
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Pageheader from "../../layout/layoutcomponent/pageheader";

interface ComponentProps { }

const Treeview: FC<ComponentProps> = () => {
  return (
    <Fragment>
            <Pageheader title="TREEVIEW" heading="Apps" active="Treeview" />
      <Row>
        <Col md={12}>
          <Card className="mg-b-20">
            <Card.Body>
              <h3 className="card-title  mg-b-10">Basic Treeview</h3>
              <p className="mg-b-20">
                It is Very Easy to Customize and it uses in website apllication.
              </p>
              <Row>
                <SimpleTreeView>
                  <TreeItem itemId="1" label="TECH">
                    <TreeItem itemId="2" label="Company Maintenance" />
                    <TreeItem itemId="3" label="Employees" />
                    <TreeItem itemId="4" label="Human Resources" />
                  </TreeItem>
                </SimpleTreeView>
                <SimpleTreeView>
                  <TreeItem itemId="5" label="XRP">
                    <TreeItem itemId="6" label="Company Maintenance" />
                    <TreeItem itemId="7" label="Employees">
                      <TreeItem itemId="8" label="Company Maintenance-1" />

                    </TreeItem>
                    <TreeItem itemId="10" label="Employees-1">
                      <TreeItem itemId="11" label="Company Maintenance-2" />
                    </TreeItem>
                    <TreeItem itemId="12" label="Employees" />
                  </TreeItem>
                </SimpleTreeView>
                <SimpleTreeView>
                  <TreeItem itemId="5" label="TECH 2">
                    <TreeItem itemId="6" label="Company Maintenance" />
                    <TreeItem itemId="7" label="Employees">
                      <TreeItem itemId="8" label="Company Maintenance" />
                      <TreeItem itemId="10" label="Employees">
                        <TreeItem itemId="11" label="Human Resource" />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="12" label="Human Resource" />
                  </TreeItem>
                </SimpleTreeView>
                <SimpleTreeView>
                  <TreeItem itemId="5" label="TECH 3">
                  </TreeItem>
                </SimpleTreeView>
              </Row>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Fragment>
  );
};

export default Treeview;