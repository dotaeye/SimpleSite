import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FullScreen } from '../components/UI';
import { Tabs, Tab } from '../components/UI/Tabs';
import { Input, Glyphicon} from 'react-bootstrap';
import { login } from '../actions/auth';

@connect(state => ({auth: state.auth}),
  {login})
export default
class Login extends Component {

  render() {
    const glyphiconUser = <Glyphicon glyph="user"/>
    const glyphiconPassword = <Glyphicon glyph="lock"/>
    return (
      <div id='login'>
        <Tabs initialSelectedIndex={0}>
          <Tab label={{title:'Login'}}>
            <form >
              <Input type='text' label='UserName' name='username' addonBefore={glyphiconUser}/>
              <Input type='password' label='Password' name='password' addonBefore={glyphiconPassword}/>
            </form>
          </Tab>
          <Tab label={{title:'Register'}}>
            <form >
              <Input type='text' label='UserName' name='username' addonBefore={glyphiconUser}/>
              <Input type='password' label='Password' name='password' addonBefore={glyphiconPassword}/>
              <Input type='password' label='Password' name='repassword' addonBefore={glyphiconPassword}/>
            </form>
          </Tab>
        </Tabs>
      </div>
    )
  }
}