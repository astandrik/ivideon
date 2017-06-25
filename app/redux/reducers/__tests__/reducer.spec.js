import reducer from "../homeReducer";
import gReducer from "../../reducer";
import expect from "expect";
import * as actions from "../../actions/actions";
import helpers from "../../../helperFunctions/helpers";

const base = {
  Home: {
    header: ""
  },
  Posts: {
    proposed: []
  }
}

describe("Global reducer test", () => {
  it("should set header", () => {
    let cheader=  "custom header";
    let expectedStore = helpers.deepAssign(base,{
      Home: {
        header: cheader
      }
    })
    let headerAction = {
      type: actions.SET_HEADER,
      header: cheader
    }
    expect(gReducer(base,headerAction)).toEqual(expectedStore);
  });
  it("should set posts", ()=> {
    let posts = [];
    posts.push({text: "hmm", time: 123});
    posts.push({text: "hmmm", time: 1234});
    const dispatchedAction = {
      type: actions.SET_PROPOSED,
      data: posts
    };
    let expectedStore = helpers.deepAssign(base, {
      Posts: {
        proposed: posts
      }
    });
    expect(gReducer(base, dispatchedAction)).toEqual(expectedStore);
  })
});

