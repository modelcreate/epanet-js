Running a simple function like getNodeIndex with epanet-js can only run ~2.26M/sec

The following was attempted to reduce overhead

- Remove check error, no impact ~2.26M/sec
- remove spread on array for memory, ~2.76M/sec
- remove allocation of memory for each call, ~5.67M/sec
- remove slice with shared memory, ~6.6M/sec
- WASM 7.8M/sec

Currently epanet js is wrapped with in C++ and uses the bind function with emscripten
If we expose the C functions directly we can get this between 20-35M/sec

I tested using ccall comapred to manually allocating memory

    let index2 = _instance.ccall(
      'getNodeIndex', // C function name
      'number', // Return type
      ['number', 'string'], // Argument types
      [projectPtr, nodeId] // Arguments
    );

    vs

```
_instance.stringToUTF8(nodeId, nodeIdPtr, nodeId.length + 1);
let index = _instance._getNodeIndex(projectPtr, nodeIdPtr);
_instance._free(intPointer);
```

ccall was 6.9M/sec
manually was 32M/sec

I also looked at other ways to pass values around and avoid recasting in C++
I couldn't figure out how to pass the ptr directly, it wanted me to also sign the function that it was using raw pointers
In the end I put static values in there and found it was still limited, will need to confirm numbers again

int getnodeindex2(const std::string& id, intptr*t index)
{
int \_ptr1 = reinterpret_cast<int *>(index);
//return EN_getnodeindex(ph, const_cast<char\*>(id.c_str()), 0);
EN_Project ph2;
EN_createproject(&ph2);

    return EN_getnodeindex(ph2, "J1", ptr1);

}

int getnodeindex(std::string id, intptr*t index)
{
int errcode;
int \_ptr1 = reinterpret_cast<int *>(index);
char \*idChar = new char[id.length() + 1];

    strcpy(idChar, id.c_str());

    errcode = EN_getnodeindex(ph, idChar, ptr1);

    delete[] idChar;
    return errcode;

}

The code to load it directly in C is as followed below.
I was originally concerned with how to deal with the project struct but it was pretty easy in the end

```
EMSCRIPTEN_KEEPALIVE
EN_Project create_project() {
    EN_Project ph = NULL; // EN_Project is already a pointer type.
    int errcode = EN_createproject(&ph);
    if (errcode != 0) {
        // If there was an error, the memory (if allocated) should ideally be freed by the library.
        // However, if you suspect a leak, you may need to handle it or check library docs.
        return NULL;
    }
    return ph;
}

EMSCRIPTEN_KEEPALIVE
int loadinp(EN_Project ph) {
    int errcode = EN_open(ph, "test.inp", "test.rpt", "test.out");
    return errcode;
}

EMSCRIPTEN_KEEPALIVE
int getNodeIndex(EN_Project ph, char *id) {
    int index;
    EN_getnodeindex(ph, id, &index);
    return index;
}

EMSCRIPTEN_KEEPALIVE
void free_project(EN_Project ph) {
    free(ph);
}
```

Some of my thinking is here:
https://chat.openai.com/c/514f602a-a47f-45d5-8c52-9fc178110327

Some other things I want to consider are how can easily export all the epanet functions without listing them
