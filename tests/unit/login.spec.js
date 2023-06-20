import { Auth } from "aws-amplify";
import { mount } from "@vue/test-utils";
import Login from "@/components/auth/Login.vue";

describe("Login", () => {
  it("renders the login form correctly", () => {
    const wrapper = mount(Login);

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("displays an error message for invalid credentials", async () => {
    // Simulate a failed login
    jest
      .spyOn(Auth, "signIn")
      .mockImplementation(() =>
        Promise.reject(new Error("Invalid email or password"))
      );

    const wrapper = mount(Login);

    await wrapper.find('input[type="text"]').setValue("invalid@example.com");
    await wrapper.find('input[type="password"]').setValue("invalidpassword");

    await wrapper.find("form").trigger("submit");

    await wrapper.vm.$nextTick(); // Wait for asynchronous updates

    expect(wrapper.find(".error-message").exists()).toBe(true);
    expect(wrapper.find(".error-message").text()).toBe(
      "L'identifiant ou le mot de passe sont invalide, veuillez les ressaisir svp..."
    );
  });
});
