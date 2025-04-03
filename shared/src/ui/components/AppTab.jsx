import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui-components';
function AppTab({ record }) {
    const tabKeys = Object.keys(record).map((tKey) => ({
        key: tKey.toLowerCase().replace(/\s+/g, ''),
        label: tKey
    }));
    return (<Tabs orientation='vertical' defaultValue={tabKeys[0]?.key} className='w-full items-center'>
      <TabsList className='grid w-full max-w-sm grid-flow-col place-self-center'>
        {tabKeys.map((tabKey) => {
            return (<TabsTrigger value={tabKey.key} key={tabKey.key}>
              {tabKey.label}
            </TabsTrigger>);
        })}
      </TabsList>

      {tabKeys.map((tabKey) => {
            return (<TabsContent value={tabKey.key} key={tabKey.key}>
            {record[tabKey.label]}
          </TabsContent>);
        })}
    </Tabs>);
}
export default AppTab;
