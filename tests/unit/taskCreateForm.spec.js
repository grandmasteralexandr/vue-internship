import {createLocalVue, shallowMount} from '@vue/test-utils'
import TaskCreateForm from '@/components/form/TaskCreateForm'
import Vuex from "vuex";
import {TaskStore} from '@/store/modules/TaskStore'

const localVue = createLocalVue();

localVue.use(Vuex);

describe('TaskCreateForm.vue', () => {
  const wrapper = shallowMount(TaskCreateForm);

  let mutations;
  let state;
  let store;

  beforeEach(() => {
    state = {
      tasks: []
    };

    mutations = {
      createTask: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        TaskStore: {
          state,
          mutations
        }
      }
    })
  });

  it('newTaskName default empty', () => {
    expect(wrapper.vm.newTaskName).toBe('')
  });

  it('show error message', () => {
    const button = wrapper.find('button.add-button');
    button.trigger('click');
    expect(wrapper.find('p').text()).toBe('Please, fix this error(s):')
    expect(wrapper.vm.errors.length).toBe(3);
  });

  it('add task', () => {
    const wrapper = shallowMount(TaskCreateForm, { store, localVue });
    wrapper.setData({
      newTaskName: 'test',
      newTaskDescription: 'test descr',
      newTaskStatus: 'To Do',
      newTaskDueDate: '2020-02-03',
      taskLastId: 0
    });
    const button = wrapper.find('button.add-button');
    button.trigger('click');
    expect(wrapper.vm.errors.length).toBe(0);
  })
});
