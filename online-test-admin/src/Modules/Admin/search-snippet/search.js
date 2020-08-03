import React, { Component } from "react";
import { authApi } from "../../../apicall";
import "./search.css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-tomorrow_night";
// import "ace-builds/webpack-resolver";                                                                                                                                                       
import AdminMainContainer from "../../../Components/admin-main-container/adminMainContainer";
import AceEditor from "react-ace";

export class Search extends Component {
  state = {
    searchResult: [],
    searchValue: "",
    selectedResult: {},
  };

  setSearchValue = () => {
    this.searchCode(this.state.searchValue);
    this.props.setPage("result");
  };

  searchCode = async (value) => {
    authApi
      .post("/changes/search", {
        code: value,
      })
      .then((res) => {
        
        this.setState({
          searchResult: res.data,
          selectedResult: res.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setSelectedResult = (res) => {
    this.setState({
      selectedResult: res,
    });
  };

  render() {
    const { searchValue } = this.state;
    const { setcurrentPage, setSearchItem } = this.props;
    return (
      <AdminMainContainer>
        <div className="SearchHeading">
          <div className="check-user-admin-1-1"> SEARCH BY CODE</div>
        </div>
        <div className="mainpage-admin-3">
          <button className="adminSearch-btn" onClick={this.setSearchValue}>
            SEARCH
          </button>
          <AceEditor
            mode={this.state.currentTab}
            height="100%"
            width="100%"
            fontSize={16}
            theme="tomorrow_night"
            onChange={(value) => this.setState({ searchValue: value })}
            value={searchValue}
            editorProps={{ $blockScrolling: false }}
          />
        </div>

        <div className="mainpage-admin-bigmain">
          {this.state.searchResult.map((item) => (
            <div
              className={`mainpage-admin-bigmain-item ${
                this.state.selectedResult === item ? "" : ""
              }`}
              onClick={(_) => {
                this.setSelectedResult(item);
                setcurrentPage(8);
                setSearchItem(item, searchValue);
              }}
              key={item._id}
            >
              <div className="question">
                <div className="question-1">{`${item.userId.name} | ${item.userId.organization}`}</div>
                <div className="question-2">{`${new Date(
                  item.updated_at
                ).toDateString()} | ${new Date(
                  item.updated_at
                ).toLocaleTimeString()}`}</div>
              </div>
              <div>{/* <i class="fas fa-ellipsis-v"></i> */}</div>
            </div>
          ))}
        </div>
      </AdminMainContainer>
    );
  }
}

export default Search;
