import { shallowMount } from "@vue/test-utils";
import History from "@/views/user/History.vue";

describe("History.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(History);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("displays a message when there is no history", () => {
    const wrapper = shallowMount(History);
    expect(wrapper.text()).toContain("No history found");
  });

  it("displays a list of history items when there is history", () => {
    const wrapper = shallowMount(History, {
      propsData: {
        history: [
          { id: 1, name: "Test Item 1" },
          { id: 2, name: "Test Item 2" },
          { id: 3, name: "Test Item 3" },
        ],
      },
    });
    expect(wrapper.findAll(".history-item").length).toBe(3);
  });
});