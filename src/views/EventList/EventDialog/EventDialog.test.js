import React from 'react'
import { EventDialog } from './EventDialog'
import enzyme from '../../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('test event dialog', function () {
    it('should call on modal open', function (done) {
        const onModalOpen = () => {
            expect(true).toBe(true)
            done()
        }

        enzyme.mount(<EventDialog isActive={true} onModalOpen={onModalOpen}/>)
    })

    it('should call on modal close', function (done) {
        const onModalClose = () => {
            expect(true).toBe(true)
            done()
        }

        const onModalOpen = () => {
            wrapper.setProps({ isActive: false })
            wrapper.update()
        }

        const wrapper = enzyme.mount(<EventDialog isActive={true} onModalOpen={onModalOpen} onModalClose={onModalClose}/>)
    })

    it('should load a csv file', function (done) {
        const wrapper = enzyme.mount(<EventDialog/>)

        const csv = 'FIRST NAME ,LAST NAME\nFrank,Riley'

        const file = new Blob([csv], {type : 'text/plain'})
        const readerResult = {
            target: {
                result: csv
            }
        }
        const readAsText = jest.fn(() => {
            dummyFileReader.onload(readerResult)
        })

        const onload = jest.fn()

        const dummyFileReader = {onload, readAsText}

        window.FileReader = jest.fn(() => dummyFileReader)

        wrapper.find('#eventDialogStockPriceInput').simulate('change', {target: {files: [file]}})

        setTimeout(() => {
            expect(wrapper.state('stock')).toEqual([{
                'FIRST NAME': 'Frank',
                'LAST NAME': 'Riley'
            }])
            done()
        }, 100)
    })


    it('should test input fields', function () {
        const wrapper = enzyme.mount(<EventDialog/>)

        const state = {
            title: 'title',
            date: '05/28/2019',
            dateColumn: 'Date',
            operationColumn: 'Close',
            T0T1: '10',
            T1E: '4',
            ET2: '7',
            T2T3: '5',
        }

        wrapper.setState(state)

        const findElement = elm => wrapper.find(elm)

        const titleField = () => findElement('#eventAddTitle')
        const dateField = () => findElement('#eventAddDate')
        const dateColumnField = () => findElement('#eventAddDateColumn')
        const operationColumnField = () => findElement('#eventAddOperationColumn')
        const T0T1Field = () => findElement('#eventAddT0T1')
        const T1EField = () => findElement('#eventAddT1E')
        const ET2Field = () => findElement('#eventAddET2')
        const T2T3Field = () => findElement('#eventAddT2T3')


        expect(titleField().props().value).toBe(state.title)
        expect(dateField().props().value).toBe(state.date)
        expect(dateColumnField().props().value).toBe(state.dateColumn)
        expect(T0T1Field().props().value).toBe(state.T0T1)
        expect(T1EField().props().value).toBe(state.T1E)
        expect(ET2Field().props().value).toBe(state.ET2)
        expect(T2T3Field().props().value).toBe(state.T2T3)

        const nextState = {
            title: 'title 1',
            date: '05/28/2020',
            dateColumn: 'Date 1',
            operationColumn: 'Close 1',
            T0T1: '15',
            T1E: '14',
            ET2: '13',
            T2T3: '12',
        }

        // change input value
        titleField().simulate('change', {target: { value: nextState.title } })
        dateField().simulate('change', {target: { value: nextState.date } })
        dateColumnField().simulate('change', { target: { value: nextState.dateColumn } })
        operationColumnField().simulate('change', { target: { value: nextState.operationColumn } })
        T0T1Field().simulate('change', { target: { value: nextState.T0T1 }})
        T1EField().simulate('change', { target: { value: nextState.T1E }})
        ET2Field().simulate('change', { target: { value: nextState.ET2 }})
        T2T3Field().simulate('change', { target: { value: nextState.T2T3 }})

        wrapper.update()

        expect(wrapper.state('title')).toBe(nextState.title)
        expect(wrapper.state('date')).toBe(nextState.date)
        expect(wrapper.state('dateColumn')).toBe(nextState.dateColumn)
        expect(wrapper.state('operationColumn')).toBe(nextState.operationColumn)
        expect(wrapper.state('T0T1')).toBe(nextState.T0T1)
        expect(wrapper.state('T1E')).toBe(nextState.T1E)
        expect(wrapper.state('ET2')).toBe(nextState.ET2)
        expect(wrapper.state('T2T3')).toBe(nextState.T2T3)
    })

    it('should check props', function () {
        const props = {
            dialogTitle: 'dialogTitle',
            title: 'title',
            date: '05/28/2019'
        }

        const wrapper = enzyme.shallow(<EventDialog {...props}/>)

        expect(wrapper.state('title')).toBe(props.title)
        expect(wrapper.state('date')).toBe(props.date)

        expect(wrapper.find('.dialog-title').text()).toBe(props.dialogTitle)
    })

    it('should check onAccept function', function () {
        const props = {
            "ET2": "",
            "T0T1": "",
            "T1E": "",
            "T2T3": "",
            "date": "05/28/2019",
            "dateColumn": "",
            "defaultEventDateFormat": "",
            "market": {},
            "operationColumn": "",
            "stock": {},
            "title": "title"
        }

        const onAccept = (data) => {
            expect(data).toEqual(props)
        }

        const wrapper = enzyme.shallow(<EventDialog {...props} onAccept={onAccept}/>)

        wrapper.find('.modal-footer .btn-primary').simulate('click')
    })
})
