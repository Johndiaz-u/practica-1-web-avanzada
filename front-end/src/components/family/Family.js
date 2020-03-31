import React, { Component } from 'react'
import { Form, Icon, Input, Button, Layout, Alert, Table, Select, Tree, Card } from 'antd';
import { lang } from 'moment';

const { TreeNode } = Tree;

class Family extends Component {

  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      familiesOptions: [],
      addNew: false,
      new_name: '',
      new_parent: '',
      new_equipments: [],
    }
    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  flatten = (subfamilies, extractChildren, level, parent) => Array.prototype.concat.apply(
    subfamilies.map(x => ({ ...x, level: level || 1, parent: parent || null })),
    subfamilies.map(x => this.flatten(extractChildren(x) || [], extractChildren, (level || 1) + 1, x.id))
  );

  extractChildren = x => x.subfamilies;


  componentWillReceiveProps(props) {
    // console.log(props)
    if (props.families.length > 0) {
      let families = { subfamilies: props.families }
      let options = this.flatten(this.extractChildren(families), this.extractChildren).map(x => delete x.subfamilies && x);
      this.setState({ treeData: props.families, familiesOptions: options })
    }

  }



  renderTreeNodes = data => {
    let nodes = data.map(fam => {
      if (fam.subfamilies) {
        return (
          <TreeNode title={fam.name} key={fam.id} dataRef={fam}>
            {this.renderTreeNodes(fam.subfamilies)}
          </TreeNode>
        );
      }
      return <TreeNode title={fam.name} key={fam.id} dataRef={fam} />;
    })
    return nodes
  };

  submitFamily() {
    this.props.addFamily({ name: this.state.new_name, parentId: this.state.new_parent, equipments: this.state.new_equipments })
    this.setState({ addNew: false })
  }

  render() {
    let { language } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {
          this.state.addNew === false ? (
            <Card title={language.families} extra={
              this.props.userLogged != undefined && (this.props.userLogged.authorities[0].authority === "ROLE_ADMIN" || (this.props.userLogged.authorities.length > 1 && this.props.userLogged.authorities[1].authority === "ROLE_ADMIN")) ? <Button type="primary" onClick={() => this.setState({ addNew: true })}>{language.new}</Button> : null}>
              {
                this.state.treeData.length > 0 ?
                  <Tree>{this.renderTreeNodes(this.state.treeData)}</Tree> : null
              }
            </Card>
          ) : (
              <Card title={`${language.new} ${language.family}`} extra={<Button onClick={() => this.setState({ addNew: false })}>{language.back}</Button>}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item label={language.name}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input a name!' }],
                    })(
                      <Input
                        prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder={language.name} onChange={this.onChange} name='new_name'
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label={language.family}>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a parent"
                      optionFilterProp="children"
                      onChange={(value) => this.onChange({ target: { name: 'new_parent', value: value } })}
                      name='new_name'
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.familiesOptions.map(fam => {
                        return (
                          <Select.Option value={fam.id}>{fam.name}</Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label={language.equipments}>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Select Equipments"
                      onChange={(value) => this.onChange({ target: { name: 'new_equipments', value: value } })}
                      name='new_equipments'>
                      {
                        this.props.equipments.length > 0 ? this.props.equipments.map(eq => {
                          return (
                            <Select.Option key={eq.id}>{eq.name}</Select.Option>
                          )
                        }) : null
                      }
                    </Select>,
                                    </Form.Item>
                </Form>
                <Button type="primary" className="login-form-button"
                  onClick={() => this.submitFamily()}>
                  {language.submit}
                </Button>
              </Card>
            )
        }
      </div>
    )
  }
}

const WrappedNewFamilyForm = Form.create({ name: 'new_family' })(Family);

export default WrappedNewFamilyForm;
