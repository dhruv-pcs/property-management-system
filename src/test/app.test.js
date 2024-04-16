import App from '../pages/_app.jsx'

describe('App', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
