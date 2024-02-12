import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { shareReferFriendAsyncThunk } from "../../redux/reducers/profileSlice";
import HeaderLogin from "../headerLogin/headerLogin";
import "./referFriend.css";
import copy from 'copy-to-clipboard';

const ReferFriend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const referFriendData = useSelector(
    (state: any) => state.getProfile.referFriend
  );
  const sharereferFriendData = useSelector(
    (state: any) => state.getProfile.shareReferFriend
  );
  const shareLink =
    sharereferFriendData &&
    sharereferFriendData.data &&
    Object.values(sharereferFriendData.data)[0];
  const copyPasswordFn = () => {
    let copyValue: any = referFriendData && referFriendData.data
    copy(copyValue)
    alert("password copied")
  }

  return (
    <>
      <HeaderLogin />
      <div className="referFriendWholeContainer">
        <div className="referFriendConatiner">
          <div className="referFriendHead">Refer friend</div>
          <div className="referFriendBody">
            <div className="referFriendBodyImg">
              <div className="referFriendImg">
                <img
                  src={require("../../assets/icn_refer_a_friend.png")}
                  alt=""
                  className="referImg"
                />
              </div>
              <div className="referFriendText">Refer friends & Earn!</div>
              <div className="referFriendTextCedit">
                Refer your friends and receive credits.
              </div>
            </div>
            <div className="referralCodeDetails">
              <div className="referCodeTxt">Your Code</div>
              <div className="referCode">
                {referFriendData && referFriendData.data}
              </div>
              <span className="codeCopy" onClick={() => copyPasswordFn()}>Copy Your Code</span>
            </div>
            <div className="referFriendBottom">
              <div className="referFriendLinks">
                <div className="referFb">
                  <a href="https://www.facebook.com/" target="_blank">
                    <img
                      src={require("../../assets/icn_facebook.png")}
                      alt=""
                      className="referFriendGmail"
                      onClick={() => {
                        dispatch(shareReferFriendAsyncThunk());
                        navigator.clipboard.writeText(shareLink);
                      }}
                    />{" "}
                  </a>
                </div>
                <div className="referFb">
                  <img
                    src={require("../../assets/icn_gmail.png")}
                    alt=""
                    className="referFriendGmail"
                    onClick={() => {
                      dispatch(shareReferFriendAsyncThunk());
                      navigator.clipboard.writeText(shareLink);
                    }}
                  />{" "}
                </div>
              </div>
              <div
                className="backToOrders"
                onClick={() => navigate("/profileDetails")}
              >
                BACK TO ORDERS
              </div>
            </div>
          </div>
        </div>
      </div>
      {""}
    </>
  );
};

export default ReferFriend;
