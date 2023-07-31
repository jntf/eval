import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App', () => {
  it('renders the header component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'Header' }).exists()).toBe(true)
  })

  it('renders the footer component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
  })

  it('renders the router view component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })
})