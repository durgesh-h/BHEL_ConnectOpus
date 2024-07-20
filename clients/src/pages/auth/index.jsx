import Background from "@/assets/bhellogo.png";
import meeting2 from "@/assets/meeting2.jpeg";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import meeting from "../../assets/meeting.jpeg";
import Footer from "@/components/Footer";
function Auth() {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log({ response });
    }
  };
  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <>
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <img
        src={meeting}
        className=" md:flex justify-center items-center w-full hidden h-screen overflow-hidden relative"
      />
      <img
        src={meeting2}
        className=" flex justify-center items-center w-full md:hidden h-screen overflow-hidden relative"
      />

      <div className=" absolute xl:flex mb-[75vh]">
        <img
          src={Background}
          alt="background login"
          className="md:h-[110px] h-28 rounded-md"
        />
      </div>
      <div className="h-[60vh] mt-40 absolute bg-white bg-opacity-90 border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-1">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl items-center font-bold md:text-4xl">
                WELCOME
              </h1>
              {/* <img src={Victory} alt="victory emoji" className="h-[100px]" /> */}
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the Discussion Forum App!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  name="login"
                  className="data-[state=active]:bg-transparent
                            text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black
                            data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  name="signup"
                  className="data-[state=active]:bg-transparent
                            text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black
                            data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="flex flex-col w-full gap-5 "
                value="login"
                name="login"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  name="emaill"
                  className="rounded-full p-6 border-blue-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="rounded-full p-6  border-blue-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                className="flex flex-col w-full gap-5 "
                value="signup"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="rounded-full p-6  border-blue-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="rounded-full p-6  border-blue-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  className="rounded-full p-6  border-blue-800"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  SignUp
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" className="h-[200px]" />
        </div> */}
        
      </div>
     
    </div>
    <Footer/>
    </>
  );
}

export default Auth;
