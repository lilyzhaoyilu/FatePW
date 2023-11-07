import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponsePeiwan: "", apiResponseCategory: "", category: "", kookRoleId: "", pwName: "", kookId: "", displayId: "", introduction: "", };


    this.handleCateogrySubmit = this.handleCateogrySubmit.bind(this);
    this.handleAddPwSubmit = this.handleAddPwSubmit.bind(this);
    this.callQueryCategory = this.callQueryCategory.bind(this);
    this.callQueryPeiwan = this.callQueryPeiwan.bind(this);
    this.displayCategoryApiResponse = this.displayCategoryApiResponse.bind(this);
    this.displayPeiwanApiResponse = this.displayPeiwanApiResponse.bind(this);
  }

  async callQueryPeiwan() {
    await fetch("/index/peiwan")
      .then(res =>
        res.json()
      ).then((data) => {
        this.setState({ apiResponsePeiwan: data });
      });
  }

  async callQueryCategory() {
    await fetch("/index/category")
      .then(res =>
        res.json()
      ).then((data) => {
        this.setState({ apiResponseCategory: data });
      });
  }

  componentDidMount() {
    this.callQueryPeiwan();
    this.callQueryCategory();
  }

  displayCategoryApiResponse() {

    if (this.state.apiResponseCategory) {

      const res = this.state.apiResponseCategory.data.map(c => {

        return <li>category: {c.category} kook role id: {c.kook_role_id}</li>
      })
      return res;
    }

    return (<li></li>);
  }

  displayPeiwanApiResponse() {

    if (this.state.apiResponsePeiwan) {

      const res = this.state.apiResponsePeiwan.data.map(c => {
        console.log("c", c);

        return <li>显示编号: {c.display_id} kook id: {c.kook_id} 名字: {c.name}</li>
      })
      return res;
    }

    return (<li></li>);
  }

  async handleCateogrySubmit() {
    try {
      await fetch("/add/category", {
        method: "POST",
        body: JSON.stringify({
          category: this.state.category, kookRoleId: this.state.kookRoleId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    } catch (err) {
      console.log('handleCateogrySubmit', err);
    }
  }

  async handleAddPwSubmit() {
    console.log("handleAddPwSubmit");
    try {
      await fetch("/add/pw", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.pwName, kookId: this.state.kookId, displayId: this.state.displayId, introduction: this.state.introduction
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    } catch (err) {
      console.log('handleAddPwSubmit', err);
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    let categories = this.displayCategoryApiResponse();
    let peiwan = this.displayPeiwanApiResponse();
    return (
      <div className="add">
        <div className="add-category">
          <form onSubmit={this.handleCateogrySubmit}>
            <input type="text" placeholder="分类 category"
              value={this.state.category}
              onChange={this.update("category")}
              className="add-category-input" />

            <input type="text" placeholder="Kook角色id"
              value={this.state.kookRoleId}
              onChange={this.update('kookRoleId')}
              className="add-category-input" />

            <input className="add-category-submit" type="submit" value="添加分类" />
          </form>
        </div>

        <form onSubmit={this.handleAddPwSubmit} className="add-pw">
          <input type="text" placeholder="名字 name"
            value={this.state.pwName}
            onChange={this.update('pwName')}
            className="add-pw-input" />

          <input type="text" placeholder="kook id"
            value={this.state.kookId}
            onChange={this.update('kookId')}
            className="add-pw-input" />

          <input type="text" placeholder="显示编号 display id"
            value={this.state.displayId}
            onChange={this.update('displayId')}
            className="add-pw-input" />

          <input type="text" placeholder="简介 introduction"
            value={this.state.introduction}
            onChange={this.update('introduction')}
            className="add-pw-input" />

          <input className="add-pw-submit" type="submit" value="添加陪玩" />
        </form>

        <div> 现在的分类</div>
        <ul class='api-response'> {categories}</ul>
        <div> -------------------------------</div>
        <div>陪玩信息</div>
        <ul class='api-response'> {peiwan}</ul>

      </div>
    );
  }
}

export default App;
