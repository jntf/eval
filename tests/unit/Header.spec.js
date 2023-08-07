import { shallowMount } from "@vue/test-utils";
import Header from "../../src/components/home/Header.vue";

describe("Header.vue", () => {
  it("affiche le nom de l'entreprise", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).toMatch("EvaluIA");
  });

  it("active/désactive le menu lors du clic sur le bouton", () => {
    const wrapper = shallowMount(Header);
    const button = wrapper.find(".navbar-burger");
    button.trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("affiche les liens de navigation", () => {
    const wrapper = shallowMount(Header);
    const links = wrapper.findAll(".navbar-menu a");
    expect(links.length).toBe(5);
    expect(links.at(0).text()).toMatch("Accueil");
    expect(links.at(1).text()).toMatch("Présentation");
    expect(links.at(2).text()).toMatch("Comment ça marche");
    expect(links.at(3).text()).toMatch("Tarifs");
    expect(links.at(4).text()).toMatch("Nous contacter");
  });
});
