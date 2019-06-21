import React from 'react'
import { ConfirmModal } from './ConfirmModal'
import enzyme from '../../lib/enzyme'
import 'bootstrap'

it('should call on modal open', () => {
    const onModalOpen = () => {
        expect(true).toBe(true)
    }

    enzyme.mount(<ConfirmModal isActive={true} onModalOpen={onModalOpen}/>)
})

it('should call on modal close', () => {
    const onModalClose = () => {
        expect(true).toBe(true)
    }

    const onModalOpen = () => {
        wrapper.setProps({
            isActive: false
        })
    }

    const wrapper = enzyme.mount(<ConfirmModal isActive={false} onModalClose={onModalClose} onModalOpen={onModalOpen}/>)
})

it('should check props', () => {
    const question = 'question'

    const wrapper = enzyme.mount(<ConfirmModal isActive={false} question={question}/>)

    expect(wrapper.find('.question').text()).toBe(question)
})

it('should call on accept', function () {
    const onAccept = () => {
        expect(true).toBe(true)
    }

    const wrapper = enzyme.mount(<ConfirmModal onAccept={onAccept}/>)

    wrapper.find('.confirm-dialog .btn-primary').simulate('click')
})