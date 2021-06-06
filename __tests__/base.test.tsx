import React,{useState} from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './base.layout'

describe('base test',()=>{
    test('layout hashChildNodes',()=>{
        render(<App/>)
        expect(screen.getByRole('wrapper').hasChildNodes()).toBe(true)
    })

    test('default layout comp1',()=>{
        render(<App/>)
        expect(screen.queryByRole('comp1')).toBeTruthy()
    })

    test('click button then switch layout comp2',async ()=>{
        render(<App/>)
        const button  = screen.getByRole('btn')
        await fireEvent.click(button)
        expect(screen.queryByRole('comp2')).toBeTruthy()
    })

    test('change Comp1 number then switch layout comp2',async()=>{
        render(<App/>)
        const comp1Input = screen.getByRole('comp1-input')
         fireEvent.change(comp1Input,{target:{
            value:1234
        }})
        expect(screen.getByDisplayValue(1234)).toBeTruthy()
        
        const button  = screen.getByRole('btn')
        await fireEvent.click(button)
        expect(screen.queryByRole('comp2')).toBeTruthy()
        expect(screen.queryByRole('comp1')).toBeFalsy()
        expect(screen.queryByDisplayValue(1234)).toBeFalsy()
        await fireEvent.click(button)
        expect(screen.queryByDisplayValue(1234)).toBeTruthy()
    })
    

    test('change Comp2 then add count',async()=>{
        render(<App/>)
        const button  = screen.getByRole('btn')
        await fireEvent.click(button)

        const countBtn  = screen.getByRole('add-count')

        expect(screen.queryByText('0',{selector:'#add-count'})).toBeTruthy()
        await fireEvent.click(countBtn)
        expect(screen.queryByText('1',{selector:'#add-count'})).toBeTruthy()
        expect(screen.queryByText('2',{selector:'#add-count'})).toBeFalsy()
        await fireEvent.click(countBtn)
        expect(screen.queryByText('2',{selector:'#add-count'})).toBeTruthy()
        
        await fireEvent.click(button)

        expect(screen.queryByText('2',{selector:'#add-count'})).toBeFalsy()

        await fireEvent.click(button)
        expect(screen.queryByText('2',{selector:'#add-count'})).toBeTruthy()

        await fireEvent.click(countBtn)

        expect(screen.queryByText('3',{selector:'#add-count'})).toBeTruthy()

    })

})

