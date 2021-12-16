export const getValueProps = (data: any, imageUrl: string) => {
    if (!data) {
        return { fileList: [] };
    }

    return {
        file: data.file,
        fileList:
            data.fileList ??
            (Array.isArray(data) ? data : [...data]).map((item: any) => {
                const file: any = {
                    name: item.attributes.name,
                    percent: item.attributes.percent,
                    size: item.attributes.size,
                    status: item.attributes.status,
                    type: item.attributes.mime || item.attributes.type,
                    uid: item.attributes.id,
                };

                if (item.attributes.url) {
                    file.url = `${imageUrl}${item.attributes.url}`;
                }

                return file;
            }),
    };
};

export const mediaUploadMapper = (params: any) => {
    Object.keys(params).map((item) => {
        if (params[item]) {
            const param = params[item].fileList;
            const isMediaField = Array.isArray(param);
            if (isMediaField) {
                const ids = [];
                for (const item of param) {
                    if (item.response) {
                        for (const response of item.response) {
                            ids.push(response.id);
                        }
                    } else {
                        ids.push(item.uid);
                    }
                }
                params[item] = ids;
            }
        }
    });
    return params;
};
