import './App.css';
import React, { Component } from "react";
import Card from './components/card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponsePeiwan: "", apiResponseLabel: "", label: "", kookRoleId: "", pwName: "", kookId: "", displayId: "", introduction: "", location: "", pictureUrl: "", contactInfo: "", timbre: "", selectedLabel: "" };


    this.handleCateogrySubmit = this.handleCateogrySubmit.bind(this);
    this.handleAddPwSubmit = this.handleAddPwSubmit.bind(this);
    this.displayLabelApiResponse = this.displayLabelApiResponse.bind(this);
    this.displayPeiwanApiResponse = this.displayPeiwanApiResponse.bind(this);
  }

  componentDidMount() {
    this.callQueryPeiwan();
    this.callQueryLabel();
  }

  async callQueryPeiwan() {
    try {
      let res = await fetch("/q/peiwan");
      const data = await res.json();
      this.setState({ apiResponsePeiwan: data });
    } catch (err) {
      console.error("callQueryPeiwan err: ", err);
    }
  }

  async callQueryLabel() {
    try {
      let res = await fetch("/q/labels");
      const data = await res.json();
      this.setState({ apiResponseLabel: data });
    } catch (err) {
      console.error("callQueryLabel err: ", err);
    }
  }

  displayLabelApiResponse() {
    if (this.state.apiResponseLabel) {
      if (this.state.selectedLabel === "") {
        this.setState({ selectedLabel: this.state.apiResponseLabel.data[0].label })
      }
      return (
        <div className="add-peiwan-input">
          <label>标签:  </label>
          <select
            value={this.state.selectedLabel}
            onChange={this.update('selectedLabel')}
          >

            {this.state.apiResponseLabel.data.map((item) => (
              <option key={item.kook_role_id} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (<div></div>);
  }

  displayPeiwanApiResponse() {

    if (this.state.apiResponsePeiwan) {

      const res = this.state.apiResponsePeiwan.data.map(pw =>
        <Card pw={pw} />
      )
      return res;
    }

    return (<div></div>);
  }

  async handleCateogrySubmit() {
    try {
      await fetch("/add/labels", {
        method: "POST",
        body: JSON.stringify({
          label: this.state.label, kookRoleId: this.state.kookRoleId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    } catch (err) {
      console.error('handleCateogrySubmit', err);
    }
  }

  async handleAddPwSubmit() {
    try {
      await fetch("/add/peiwan", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.pwName, kookId: this.state.kookId, displayId: this.state.displayId, introduction: this.state.introduction, location: this.state.location, contactInfo: this.state.contactInfo, pictureUrl: this.state.pictureUrl, timbre: this.state.timbre, label: this.state.selectedLabel
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    } catch (err) {
      console.error('handleAddPwSubmit', err);
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {

    let labels = this.displayLabelApiResponse();
    let peiwan = this.displayPeiwanApiResponse();
    console.log(this.state);
    return (
      <div className="add">
        <div className="add-label">
          <form onSubmit={this.handleCateogrySubmit}>
            <input type="text" placeholder="标签 label"
              value={this.state.label}
              onChange={this.update("label")}
              className="add-label-input" />

            <input type="text" placeholder="Kook角色id"
              value={this.state.kookRoleId}
              onChange={this.update('kookRoleId')}
              className="add-label-input" />

            <input className="add-label-submit" type="submit" value="添加分类" />
          </form>
        </div>

        <form onSubmit={this.handleAddPwSubmit} className="add-peiwan">
          <input type="text" placeholder="名字 name"
            value={this.state.pwName}
            onChange={this.update('pwName')}
            className="add-peiwan-input" />

          <input type="text" placeholder="编号 display id"
            value={this.state.displayId}
            onChange={this.update('displayId')}
            className="add-peiwan-input" />

          <input type="text" placeholder="kook id"
            value={this.state.kookId}
            onChange={this.update('kookId')}
            className="add-peiwan-input" />

          <input type="text" placeholder="音色"
            value={this.state.timbre}
            onChange={this.update('timbre')}
            className="add-peiwan-input" />

          <input type="text" placeholder="个人特色 introduction"
            value={this.state.introduction}
            onChange={this.update('introduction')}
            className="add-peiwan-input" />

          <input type="text" placeholder="坐标 location"
            value={this.state.location}
            onChange={this.update('location')}
            className="add-peiwan-input" />

          <input type="text" placeholder="头像图片 picture URL"
            value={this.state.pictureUrl}
            onChange={this.update('pictureUrl')}
            className="add-peiwan-input" />

          <input type="text" placeholder="联系方式 contactInfo"
            value={this.state.contactInfo}
            onChange={this.update('contactInfo')}
            className="add-peiwan-input" />

          {labels}

          <input className="add-pw-submit" type="submit" value="添加陪玩" />
        </form>


        <div>陪玩信息</div>
        <ul className='api-response'> {peiwan}</ul>

      </div>
    );
  }
}

export default App;
