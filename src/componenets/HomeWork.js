import React from "react";
import { Validate } from "./Validators/validator";
import "../Style/homeWork.css";
import { Navbar } from "./Navbar";
import { connect } from "react-redux";
import { postID } from "../data/actionCreator";
import { HomeWork3 } from "./contents/HomeWork3";
import { ToggleLink } from "./ToggleLink";
import $ from "jquery";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { POST } from "../data/Types";
import { withRouter } from "react-router-dom";

export const HomeWork = withRouter(
  connect(
    () => ({}),
    (dispatch) => ({
      postID: (id, successCallback, failedCallback, type) =>
        dispatch(postID(id, successCallback, failedCallback, type)),
    })
  )(
    class extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          type: POST,
          card: props.card,
          tahw13:
            "https://docs.google.com/document/d/11vdKYgGdQx3UHoblUPtVhAC-tNS2A90nJnUUL6ZdamQ/edit?usp=sharing",
          HOMEWORKURL:
            "http://apj.ce.kntu.ac.ir/git/root/tahw11-recursion-gui-starter/-/blob/master/README.md",
          projectURL:
            "https://docs.google.com/document/d/1ndw67EaahUM3y1E9RBQSO8du1wM5sWH20jXTvLRtSiM/edit?usp=sharing",
          homework: {
            description: HomeWork3,
            title: "HomeWork3",
            name: "پروژه سوم - فریبرز در قرنطینه",
          },
          isSubmitted: false,
          data: {
            student_id: "",
            exercise_id: props.card === "project" ? 3 : 7,
          },
          rules: {
            student_id: {
              required: true,
              number: true,
              minLenght: 7,
              check: true,
            },
          },
          errors: {
            student_id: [],
          },
          attentionError: "",
          successMsg: "",
          failedMsg: "",
          dirty: {},
        };
      }

      get submit() {
        let ok = true;

        Object.keys(this.state.errors).forEach((key) => {
          if (this.state.errors[key].length !== 0) ok = false;
        });

        return ok;
      }

      componentDidMount() {
        console.log("componenet did mount");
      }

      onChange = (event) => {
        event.persist();
        this.setState((state) => {
          state.data[event.target.name] = event.target.value.trim();
          state.dirty[event.target.name] = true;
          return { ...state };
        });
      };

      onClick = () => {
        if (this.submit && !this.state.isSubmitted) {
          try {
            this.props.postID(
              this.state.data,
              (url) => {
                this.setState({
                  isSubmitted: true,
                  successMsg: "submition was successful",
                  failedMsg: "",
                  attentionError: "",
                });
                window.open(url, "_blank");
                window.location.reload();
              },
              (message) => {
                this.setState({
                  isSubmitted: false,
                  failedMsg: message,
                  successMsg: "",
                });
              },
              this.state.type
            );
          } catch (ex) {
            this.forceUpdate();
          }
        } else {
          this.setState({
            attentionError: "Please pay attention to errors!",
            successMsg: "",
          });
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      static getExerciseId = (props) => {
        if (props.card === "project") return 5;
        else if (props.card === "thaw12-recursion") return 7;
        else if (props.card === "tahw13-tree-gui") return 8;
        else if (props.card === "tahw13-file-gui") return 13;
        else if (props.card === "tahw14-file-serializable") return 14;
        else if (props.card === "tahw15-dao-file") return 15;
        else if (props.card === "fariborz-square") return 20;
        else if (props.card === "pattern-recognition") return 21;
        else if (props.card === "bomberman") return 25;
        else if (props.card === "hospital-file-manager") return 26;
        else if (props.card === "concurrency-report") return 27;
      };

      static getDerivedStateFromProps(props, state) {
        const { card } = props;
        return {
          ...state,
          card: card,
          rules: state.rules,
          data: {
            student_id: card !== state.card ? "" : state.data.student_id,
            exercise_id: HomeWork.getExerciseId(props),
          },
          projectURL:
            card === "tahw13-tree-gui" ? state.tahw13 : state.HOMEWORKURL,
          type: POST,
          attentionError: card !== state.card ? " " : state.attentionError,
          successMsg: card !== state.card ? " " : state.successMsg,
          failedMsg: card !== state.card ? " " : state.failedMsg,
          errors:
            card !== state.card
              ? { student_id: [] }
              : Validate(state.rules, state.data),
        };
      }

      onToggle = () => {
        $(".aside > div").toggle("150", "swing");
        $(".aside > p > span").toggleClass("fa-caret-right");
      };

      makeContent = (title) => {
        return (
          <div className="homework-component box">
            <div style={{ textAlign: "center", fontSize: "2em" }}>{title}</div>
            <hr color="yellow" />
            <div className="text-center text-danger">
              {this.state.attentionError}
            </div>
            <div className="text-center text-danger">
              {this.state.failedMsg}
            </div>
            <div className="text-center text-success">
              {this.state.successMsg}
            </div>
            <a
              rel="noopener noreferrer"
              href={this.state.projectURL}
              target="_blank"
              className="homework-component doc"
            >
              {title !== "workshop" ? `${title} Doc` : ""}
            </a>
            <div style={{ marginTop: "50px" }}>
              <div className="row">
                <div className="col-6">
                  <FormControl fullWidth>
                    <InputLabel
                      style={{ color: "white" }}
                      htmlFor={"student_id"}
                    >
                      StudentID
                    </InputLabel>
                    <Input
                      onChange={this.onChange}
                      autoFocus={true}
                      style={{ color: "white" }}
                      type="text"
                      value={this.state.data.student_id}
                      name={"student_id"}
                      id={"studnet_id"}
                      autoComplete="off"
                    />
                    <div>
                      {this.state.errors.student_id.map((err) => (
                        <div
                          style={{ color: "orange", fontSize: "1em" }}
                          key={err}
                        >
                          {err}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </div>
                <div className="col-6">
                  <button
                    className="mt-4 btn btn-primary"
                    onClick={() =>
                      this.props.card !== "project"
                        ? this.onClick()
                        : this.setState({
                            attentionError: "currently disabel!!",
                          })
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      };

      render() {
        // console.log(this.state.data.exercise_id)
        return (
          <div
            style={{ scrollBehavior: "smooth" }}
            className="homework-component"
          >
            <div>
              <Navbar />
            </div>
            <div className="homework-component main">
              <div className="homework-component side-bar">
                <aside className="aside">
                  <p onClick={this.onToggle}>
                    Pages <span className="fas fa-caret-down"></span>
                  </p>
                  <div>
                    <ToggleLink
                      to="/homeworks/bomberman"
                      name="bomberman"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/hospital-file-manager"
                      name="hospital-file-manager"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/concurrency-report"
                      name="concurrency-report"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/thaw12-recursion"
                      name="thaw12-recursion"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/project"
                      name="project"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/fariborz-square"
                      name="fariborz-square"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/tahw13-tree-gui"
                      name="tahw13-tree-gui"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/tahw13-file-gui"
                      name="tahw13-file-gui"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/tahw14-file-serializable"
                      name="tahw14-file-serializable"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/tahw15-dao-file"
                      name="tahw15-dao-file"
                      exact={true}
                    />
                  </div>
                  <div>
                    <ToggleLink
                      to="/homeworks/pattern-recognition"
                      name="pattern-recognition"
                      exact={true}
                    />
                  </div>
                </aside>
              </div>
              <div className="home-component content">
                {this.makeContent(this.props.card)}
              </div>
            </div>
          </div>
        );
      }
    }
  )
);
